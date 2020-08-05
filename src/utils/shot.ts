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

export const makeShot = (appState: AppState): AppState => {
  const availableKey = getRandomAvailableKey(appState.battleground);

  let battleground = mergeBattlegroundState(appState.battleground, {
    [availableKey]: CellStatus.MISSED,
  });

  const recalculatedShips: Ship[] = appState.ships.map((ship) =>
    shotShip(ship, availableKey),
  );

  let isGameOver = true;
  recalculatedShips.forEach((ship) => {
    battleground = mergeBattlegroundState(battleground, ship.parts);
    isGameOver = isGameOver && !ship.isAlive;
  });

  return {
    ships: recalculatedShips,
    battleground,
    isGameOver,
  };
};
