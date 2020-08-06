import React from 'react';
import Cell from './Cell';
import { makeShot } from '../utils/shot';
import { CellsWrapper } from './CellsWrapper';
import { useAction } from '@reatom/react';
import { appState, changeAppState } from '../state/appState';
import { AREA_SIZE } from '../utils/constants';
import { getKeyByCoord } from '../utils/battleground';
import { store } from './App';

function Battleground(): JSX.Element {
  const setState: Function = useAction(changeAppState);

  const cells: JSX.Element[] = [];

  for (let i = 0; i < AREA_SIZE; i++) {
    for (let j = 0; j < AREA_SIZE; j++) {
      const key = getKeyByCoord(i, j);
      cells.push(
        <Cell
          key={key}
          cellKey={key}
          onClick={(): void =>
            setState(makeShot(store.getState(appState), key))
          }
        />,
      );
    }
  }

  return <CellsWrapper>{cells}</CellsWrapper>;
}

export default Battleground;
