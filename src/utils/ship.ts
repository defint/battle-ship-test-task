import {
  BattlegroundState,
  CellStatus,
  Ship,
  ShipModel,
  ShipRotation,
  ShipScheme,
  ShipType,
} from './types';
import { getCoordByKey, getKeyByCoord } from './battleground';
import { AREA_SIZE } from './constants';

export const getShipScheme = (shipType: ShipType): ShipScheme => {
  const { model, rotation, reverse } = shipType;

  switch (model) {
    case ShipModel.LINE:
      switch (rotation) {
        case ShipRotation.TOP:
        case ShipRotation.BOTTOM:
          return (x, y): string[] => [
            getKeyByCoord(x, y),
            getKeyByCoord(x, y + 1),
            getKeyByCoord(x, y + 2),
            getKeyByCoord(x, y + 3),
          ];
        default:
        case ShipRotation.LEFT:
        case ShipRotation.RIGHT:
          return (x, y): string[] => [
            getKeyByCoord(x, y),
            getKeyByCoord(x + 1, y),
            getKeyByCoord(x + 2, y),
            getKeyByCoord(x + 3, y),
          ];
      }
    case ShipModel.CURVED:
      switch (rotation) {
        case ShipRotation.TOP:
        case ShipRotation.BOTTOM:
          return (x, y): string[] => {
            const head = getKeyByCoord(
              reverse ? x + 1 : x - 1,
              rotation === ShipRotation.BOTTOM ? y + 2 : y,
            );

            return [
              getKeyByCoord(x, y),
              getKeyByCoord(x, y + 1),
              getKeyByCoord(x, y + 2),
              head,
            ];
          };
        default:
        case ShipRotation.LEFT:
        case ShipRotation.RIGHT:
          return (x, y): string[] => {
            const head = getKeyByCoord(
              rotation === ShipRotation.LEFT ? x : x + 2,
              reverse ? y + 1 : y - 1,
            );

            return [
              getKeyByCoord(x, y),
              getKeyByCoord(x + 1, y),
              getKeyByCoord(x + 2, y),
              head,
            ];
          };
      }
    case ShipModel.SINGLE:
    default:
      return (x, y): string[] => [`${x}:${y}`];
  }
};

export const createShip = (shipPositions: string[], type: ShipType): Ship => {
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

export const shotShip = (ship: Ship, shotKey: string): Ship => {
  const target = ship.parts[shotKey];

  if (target) {
    const newParts = { ...ship.parts };

    switch (target) {
      case CellStatus.SHIP:
        newParts[shotKey] = CellStatus.SHIP_SINK;

        const isAlive = Object.values(newParts).some(
          (status) => status === CellStatus.SHIP,
        );

        if (!isAlive) {
          for (const [key, value] of Object.entries(newParts)) {
            if (value === CellStatus.SHIP_SINK) {
              newParts[key] = CellStatus.SHIP_DEAD;
            }

            if (value === CellStatus.SHIP_BOUNDARY) {
              newParts[key] = CellStatus.MISSED;
            }
          }
        }

        break;
      case CellStatus.SHIP_BOUNDARY:
        newParts[shotKey] = CellStatus.MISSED;
        break;
      default:
        break;
    }

    return { ...ship, parts: newParts };
  }
  return ship;
};
