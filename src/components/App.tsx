import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE, SIMULATION_DELAY_MS } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AppState } from '../utils/types';
import { getInitialState } from '../utils/battleground';
import { makeShot } from '../utils/shot';
import { useInterval } from '../utils/useInterval';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: ${CELL_SIZE * AREA_SIZE}px;
  border-top: 1px solid ${CELL_BORDER_COLOR};
  border-left: 1px solid ${CELL_BORDER_COLOR};
`;

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState(false);

  const [state, setState] = useState<AppState>(getInitialState());

  useInterval(
    () => {
      setState((old) => makeShot(old));
    },
    isRunning && !state.isGameOver ? SIMULATION_DELAY_MS : null,
  );

  const cells: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.battleground)) {
    cells.push(<Cell key={key} cellState={value} />);
  }

  return (
    <div>
      <Wrapper>{cells}</Wrapper>
      {!state.isGameOver && (
        <button
          onClick={(): void => {
            setState((old) => makeShot(old));
          }}
        >
          SHOT
        </button>
      )}
      <button
        onClick={(): void => {
          setState(getInitialState());
        }}
      >
        RESTART
      </button>

      <button
        onClick={(): void => {
          setIsRunning((old) => !old);
        }}
      >
        RUN SIM
      </button>
    </div>
  );
}

export default App;
