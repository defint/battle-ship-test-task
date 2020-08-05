import { ShipModel, ShipRotation, ShipScheme, ShipType } from './types';
import { getKeyByCoord } from './battleground';

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
              rotation === ShipRotation.BOTTOM ? y + 3 : y,
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
              rotation === ShipRotation.LEFT ? x : x + 3,
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
