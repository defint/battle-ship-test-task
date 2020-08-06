import React, { useState } from 'react';
import Cell from './Cell';
import { getInitialState } from '../utils/battleground';
import { makeRandomShot, makeShot } from '../utils/shot';
import { CellsWrapper } from './CellsWrapper';
import styled from 'styled-components';
import { useAction, useAtom } from '@reatom/react';
import { useInterval } from '../utils/useInterval';
import { SIMULATION_DELAY_MS } from '../utils/constants';
import { appState, changeAppState } from '../state/appState';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  height: 38px;
  display: inline-block;
  margin-top: 14px;
`;

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState(false);

  const state = useAtom(appState);
  const setState: Function = useAction(changeAppState);

  const clickRandomCallback = (): void => {
    setState(makeRandomShot(state));
  };

  useInterval(
    () => {
      document.getElementById('random-button')?.click();
    },
    isRunning && !state.isGameOver ? SIMULATION_DELAY_MS : null,
  );

  const cells: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.battleground)) {
    cells.push(
      <Cell
        key={key}
        cellState={value}
        onClick={(): void => setState(makeShot(state, key))}
      />,
    );
  }

  return (
    <AppContainer>
      <div>
        <div>
          <Button
            id="random-button"
            onClick={clickRandomCallback}
            disabled={state.isGameOver}
          >
            {state.isGameOver ? 'Game is over' : 'Make random shot'}
          </Button>
        </div>
        <div>
          <Button
            onClick={(): void => {
              setState(getInitialState());
            }}
          >
            Restart game
          </Button>
        </div>
        <div>
          <Button
            onClick={(): void => {
              setIsRunning((old) => !old);
            }}
          >
            {isRunning ? 'Stop click simulation' : 'Run click simulation'}
          </Button>
        </div>
      </div>
      <CellsWrapper>{cells}</CellsWrapper>
    </AppContainer>
  );
}

export default App;
