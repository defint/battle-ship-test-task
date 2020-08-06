import React from 'react';
import Cell from './Cell';
import { makeShot } from '../utils/shot';
import { CellsWrapper } from './CellsWrapper';
import styled from 'styled-components';
import { useAction } from '@reatom/react';
import { appState, changeAppState } from '../state/appState';
import Controls from './Controls';
import { AREA_SIZE } from '../utils/constants';
import { getKeyByCoord } from '../utils/battleground';
import { store } from '../index';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App(): JSX.Element {
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

  return (
    <AppContainer>
      <Controls />
      <CellsWrapper>{cells}</CellsWrapper>
    </AppContainer>
  );
}

export default App;
