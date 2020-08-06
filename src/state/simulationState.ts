import { declareAction, declareAtom } from '@reatom/core';

export const changeIsSimulationAction = declareAction<boolean>();

export const isSimulationState = declareAtom<boolean>(false, (on) => [
  on(changeIsSimulationAction, (state: boolean): boolean => !state),
]);
