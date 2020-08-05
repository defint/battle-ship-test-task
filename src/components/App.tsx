import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AppState, BattlegroundState, CellStatus } from '../utils/types';
import {
  getInitialState,
  getRandomArrayItem,
  mergeBattlegroundState,
} from '../utils/battleground';

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

const isAvailableForShot = (cellStatus: CellStatus): boolean =>
  [CellStatus.EMPTY, CellStatus.SHIP, CellStatus.SHIP_BOUNDARY].some(
    (item) => item === cellStatus,
  );

const getRandomAvailableKey = (
  battlegroundState: BattlegroundState,
): [string, number] => {
  const availablePositions = [];

  for (const [key, value] of Object.entries(battlegroundState)) {
    if (isAvailableForShot(value)) {
      availablePositions.push(key);
    }
  }

  return [
    getRandomArrayItem<string>(availablePositions),
    availablePositions.length - 1,
  ];
};

const makeShot = (appState: AppState): AppState => {
  const [availableKey, leftShots] = getRandomAvailableKey(
    appState.battleground,
  );

  return {
    ...appState,
    battleground: mergeBattlegroundState(appState.battleground, {
      [availableKey]: CellStatus.MISSED,
    }),
    isGameOver: leftShots === 0,
  };
};

function App(): JSX.Element {
  const [state, setState] = useState<AppState>(getInitialState());

  const cells: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.battleground)) {
    cells.push(<Cell key={key} cellState={value} />);
  }

  return (
    <div>
      <Wrapper>{cells}</Wrapper>
      {!state.isGameOver && (
        <button
          onClick={(): void => {
            setState((old) => makeShot(old));
          }}
        >
          SHOT
        </button>
      )}
      <button
        onClick={(): void => {
          setState(getInitialState());
        }}
      >
        RESTART
      </button>
    </div>
  );
}

export default App;
