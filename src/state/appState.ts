import { declareAction, declareAtom } from '@reatom/core';
import { AppState } from '../utils/types';
import { getInitialState } from '../utils/battleground';

export const changeAppState = declareAction<AppState>();

export const appState = declareAtom<AppState>(getInitialState(), (on) => [
  on(changeAppState, (state: AppState, payload: AppState): AppState => payload),
]);
