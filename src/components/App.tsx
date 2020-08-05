import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE, CellStatus, ShipType } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AppState, BattlegroundState, Ship } from '../utils/types';

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

const mergeBattlegroundState = (
  battlegroundState: BattlegroundState,
  partialStateForUpdate: BattlegroundState,
): BattlegroundState => ({
  ...battlegroundState,
  ...partialStateForUpdate,
});

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

const createShip = (): Ship => {
  const parts = {
    '0:1': CellStatus.SHIP,
  };

  const boundaries: BattlegroundState = {};

  for (const [key] of Object.entries(parts)) {
    const [x, y] = key.split(':').map((item) => parseInt(item, 10));
    const xMin = Math.max(0, x - 1);
    const xMax = Math.min(AREA_SIZE, x + 1);
    const yMin = Math.max(0, y - 1);
    const yMax = Math.min(AREA_SIZE, y + 1);

    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        const key = `${i}:${j}`;
        boundaries[key] = CellStatus.SHIP_BOUNDARY;
      }
    }
  }

  return {
    type: ShipType.SINGLE,
    parts: {
      ...boundaries,
      ...parts,
    },
  };
};

const getInitialState = (): AppState => {
  const initialBattleground = getInitialBattlegroundState();

  const ship = createShip();

  return {
    battleground: mergeBattlegroundState(initialBattleground, ship.parts),
    isGameOver: false,
    ships: [ship],
  };
};

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

  const randomPos = Math.floor(Math.random() * availablePositions.length);
  return [availablePositions[randomPos], availablePositions.length - 1];
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
