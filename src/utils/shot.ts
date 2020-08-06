import { AppState, BattlegroundState, CellStatus, Ship } from './types';
import { getRandomArrayItem, mergeBattlegroundState } from './battleground';
import { shotShip } from './ship';

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

export const makeShot = (
  appState: AppState,
  availableKey: string,
): AppState => {
  if (!isAvailableForShot(appState.battleground[availableKey])) {
    return appState;
  }

  let battleground = mergeBattlegroundState(appState.battleground, {
    [availableKey]: CellStatus.MISSED,
  });

  const recalculatedShips: Ship[] = appState.ships.map((ship) =>
    shotShip(ship, availableKey),
  );

  const gameOver = recalculatedShips.reduce<boolean>((acc, current) => {
    battleground = mergeBattlegroundState(battleground, current.parts);
    return acc && !current.isAlive;
  }, true);

  return {
    ships: recalculatedShips,
    battleground,
    gameOver,
  };
};

export const makeRandomShot = (appState: AppState): AppState => {
  const availableKey = getRandomAvailableKey(appState.battleground);
  return makeShot(appState, availableKey);
};
