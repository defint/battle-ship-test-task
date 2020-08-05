import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE, CellStatus } from '../constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: ${CELL_SIZE * AREA_SIZE}px;
  border-top: 1px solid ${CELL_BORDER_COLOR};
  border-left: 1px solid ${CELL_BORDER_COLOR};
`;

type BattlegroundState = { [key: string]: CellStatus };

interface AppState {
  battleground: BattlegroundState;
  isGameOver: boolean;
}

const getInitialBattlegroundState = (): BattlegroundState => {
  const battleground: { [key: string]: CellStatus } = {};

  for (let i = 0; i < AREA_SIZE; i++) {
    for (let j = 0; j < AREA_SIZE; j++) {
      const key = `${i}:${j}`;
      battleground[key] = CellStatus.EMPTY;
    }
  }

  return battleground;
};

const mergeBattlegroundState = (
  battlegroundState: BattlegroundState,
  partialStateForUpdate: BattlegroundState,
): BattlegroundState => ({
  ...battlegroundState,
  ...partialStateForUpdate,
});

const isAvailableForShot = (cellStatus: CellStatus): boolean =>
  [CellStatus.EMPTY, CellStatus.SHIP].some((item) => item === cellStatus);

const getRandomAvailableKey = (
  battlegroundState: BattlegroundState,
): [string, number] => {
  const availablePositions = [];

  for (const [key, value] of Object.entries(battlegroundState)) {
    if (isAvailableForShot(value)) {
      availablePositions.push(key);
    }
  }

  const randomPos = Math.floor(Math.random() * availablePositions.length);
  return [availablePositions[randomPos], availablePositions.length - 1];
};

const makeShot = (appState: AppState): AppState => {
  const [availableKey, leftShots] = getRandomAvailableKey(
    appState.battleground,
  );

  return {
    battleground: mergeBattlegroundState(appState.battleground, {
      [availableKey]: CellStatus.MISSED,
    }),
    isGameOver: leftShots === 0,
  };
};

function App(): JSX.Element {
  const [state, setState] = useState<AppState>({
    battleground: getInitialBattlegroundState(),
    isGameOver: false,
  });

  const cells: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.battleground)) {
    cells.push(<Cell key={key} cellState={value} />);
  }

  return (
    <div>
      <Wrapper>{cells}</Wrapper>
      {!state.isGameOver && (
        <button
          onClick={() => {
            setState((old) => makeShot(old));
          }}
        >
          SHOT
        </button>
      )}
    </div>
  );
}

export default App;
