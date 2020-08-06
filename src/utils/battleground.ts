import {
  AppState,
  BattlegroundState,
  CellStatus,
  Ship,
  ShipRotation,
  ShipType,
} from './types';
import { createShip, getShipScheme } from './ship';
import { AREA_SIZE, shipModelsList } from './constants';

export const getKeyByCoord = (x: number, y: number): string => `${x}:${y}`;

export const getCoordByKey = (key: string): number[] =>
  key.split(':').map((item) => parseInt(item, 10));

export const getRandomArrayItem = <T>(arr: Array<T>): T => {
  const randomPos = Math.floor(Math.random() * arr.length);
  return arr[randomPos];
};

export const mergeBattlegroundState = (
  battlegroundState: BattlegroundState,
  partialStateForUpdate: BattlegroundState,
): BattlegroundState => {
  const result = { ...battlegroundState };

  for (const [key, value] of Object.entries(partialStateForUpdate)) {
    const oldValue = result[key];
    if (oldValue === CellStatus.MISSED && value === CellStatus.SHIP_BOUNDARY) {
      result[key] = CellStatus.MISSED;
    } else {
      result[key] = value;
    }
  }
  return result;
};

const getInitialBattlegroundState = (): BattlegroundState => {
  const battleground: BattlegroundState = {};

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

export const getInitialState = (): AppState => {
  let battleground = getInitialBattlegroundState();
  const ships: Ship[] = [];

  shipModelsList.forEach((model) => {
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
    gameOver: false,
    ships,
  };
};
