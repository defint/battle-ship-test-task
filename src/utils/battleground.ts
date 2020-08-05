export const getKeyByCoord = (x: number, y: number): string => `${x}:${y}`;

export const getCoordByKey = (key: string): number[] =>
  key.split(':').map((item) => parseInt(item, 10));
