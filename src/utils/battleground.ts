export const getKeyByCoord = (x: number, y: number): string => `${x}:${y}`;

export const getCoordByKey = (key: string): number[] =>
  key.split(':').map((item) => parseInt(item, 10));

export const getRandomArrayItem = <T>(arr: Array<T>): T => {
  const randomPos = Math.floor(Math.random() * arr.length);
  return arr[randomPos];
};
