import React, { useState } from 'react';
import { SIMULATION_DELAY_MS } from '../utils/constants';
import Cell from './Cell';
import { AppState } from '../utils/types';
import { getInitialState } from '../utils/battleground';
import { makeShot } from '../utils/shot';
import { useInterval } from '../utils/useInterval';
import { CellsWrapper } from './CellsWrapper';
import styled from 'styled-components';

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

  const [state, setState] = useState<AppState>(getInitialState());

  useInterval(
    () => setState(makeShot),
    isRunning && !state.isGameOver ? SIMULATION_DELAY_MS : null,
  );

  const cells: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.battleground)) {
    cells.push(<Cell key={key} cellState={value} />);
  }

  return (
    <AppContainer>
      <div>
        <div>
          <Button
            onClick={(): void => {
              setState(makeShot);
            }}
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
            {isRunning ? 'Stop simulation' : 'Run simulation'}
          </Button>
        </div>
      </div>
      <CellsWrapper>{cells}</CellsWrapper>
    </AppContainer>
  );
}

export default App;
