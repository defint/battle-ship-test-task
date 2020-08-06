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
      cells.push(
        <Cell
          key={getKeyByCoord(i, j)}
          cellKey={getKeyByCoord(i, j)}
          onClick={(): void =>
            setState(makeShot(store.getState(appState), getKeyByCoord(i, j)))
          }
        />,
      );
    }
  }

  return <CellsWrapper>{cells}</CellsWrapper>;
}

export default Battleground;
