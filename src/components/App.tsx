import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import {
  AppState,
  BattlegroundState,
  CellStatus,
  Ship,
  ShipModel,
  ShipRotation,
  ShipType,
} from '../utils/types';
import {
  getCoordByKey,
  getKeyByCoord,
  getRandomArrayItem,
} from '../utils/battleground';
import { getShipScheme } from '../utils/ship';

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
      battleground[getKeyByCoord(i, j)] = CellStatus.EMPTY;
    }
  }

  return battleground;
};

const checkAvailableShipPosition = (
  battlegroundState: BattlegroundState,
  shipType: ShipType,
): string[][] => {
  const result = [];
  const currentScheme = getShipScheme(shipType);
  for (const [key] of Object.entries(battlegroundState)) {
    const [x, y] = getCoordByKey(key);
    const allPositions = currentScheme(x, y);
    const canAdd = allPositions.every(
      (item) => battlegroundState[item] === CellStatus.EMPTY,
    );
    if (canAdd) {
      result.push(allPositions);
    }
  }
  return result;
};

const createShip = (shipPositions: string[], type: ShipType): Ship => {
  const parts: BattlegroundState = {};

  shipPositions.forEach((item) => {
    parts[item] = CellStatus.SHIP;
  });

  const boundaries: BattlegroundState = {};

  for (const [key] of Object.entries(parts)) {
    const [x, y] = getCoordByKey(key);
    const xMin = Math.max(0, x - 1);
    const xMax = Math.min(AREA_SIZE - 1, x + 1);
    const yMin = Math.max(0, y - 1);
    const yMax = Math.min(AREA_SIZE - 1, y + 1);

    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        boundaries[getKeyByCoord(i, j)] = CellStatus.SHIP_BOUNDARY;
      }
    }
  }

  return {
    type,
    parts: {
      ...boundaries,
      ...parts,
    },
  };
};

const getInitialState = (): AppState => {
  let battleground = getInitialBattlegroundState();
  const ships: Ship[] = [];

  const shipModels = [
    ShipModel.CURVED,
    ShipModel.LINE,
    ShipModel.SINGLE,
    ShipModel.SINGLE,
  ];
  shipModels.forEach((model) => {
    const type = {
      model,
      reverse: getRandomArrayItem<boolean>([true, false]),
      rotation: getRandomArrayItem<ShipRotation>([
        ShipRotation.LEFT,
        ShipRotation.BOTTOM,
        ShipRotation.RIGHT,
        ShipRotation.TOP,
      ]),
    };
    const allPositions = checkAvailableShipPosition(battleground, type);
    const randomPosition: string[] = getRandomArrayItem<string[]>(allPositions);
    const ship = createShip(randomPosition, type);
    ships.push(ship);
    battleground = mergeBattlegroundState(battleground, ship.parts);
  });

  return {
    battleground,
    isGameOver: false,
    ships,
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
