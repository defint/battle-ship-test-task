import {
  getCoordByKey,
  getKeyByCoord,
  getRandomArrayItem,
} from './battleground';

test('getKeyByCoord should return correct result', () => {
  const actual = getKeyByCoord(1, 2);
  expect(actual).toBe('1:2');
});

test('getCoordByKey should return correct result', () => {
  const actual = getCoordByKey('1:3');
  expect(actual).toEqual([1, 3]);
});

describe('getRandomArrayItem', () => {
  test('should return random result with string generic type', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const item = getRandomArrayItem<string>(arr);
    expect(arr).toContain(item);
  });

  test('should return random result with number generic type', () => {
    const arr = [1, 2, 3, 4];
    const item = getRandomArrayItem<number>(arr);
    expect(arr).toContain(item);
  });
});
