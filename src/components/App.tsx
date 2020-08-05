import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AppState, BattlegroundState, CellStatus, Ship } from '../utils/types';
import {
  getInitialState,
  getRandomArrayItem,
  mergeBattlegroundState,
} from '../utils/battleground';
import { shotShip } from '../utils/ship';

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
): string => {
  const availablePositions = [];

  for (const [key, value] of Object.entries(battlegroundState)) {
    if (isAvailableForShot(value)) {
      availablePositions.push(key);
    }
  }

  return getRandomArrayItem<string>(availablePositions);
};

const makeShot = (appState: AppState): AppState => {
  const availableKey = getRandomAvailableKey(appState.battleground);

  let battleground = mergeBattlegroundState(appState.battleground, {
    [availableKey]: CellStatus.MISSED,
  });

  const recalculatedShips: Ship[] = appState.ships.map((ship) =>
    shotShip(ship, availableKey),
  );

  recalculatedShips.forEach((ship) => {
    battleground = mergeBattlegroundState(battleground, ship.parts);
  });

  return {
    ships: recalculatedShips,
    battleground,
    isGameOver: false,
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
