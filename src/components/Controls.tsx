import React from 'react';
import { getInitialState } from '../utils/battleground';
import { makeRandomShot } from '../utils/shot';
import styled from 'styled-components';
import { useAction, useAtom } from '@reatom/react';
import { useInterval } from '../utils/useInterval';
import { SIMULATION_DELAY_MS } from '../utils/constants';
import { appState, changeAppState } from '../state/appState';
import {
  changeIsSimulationAction,
  isSimulationState,
} from '../state/simulationState';

const Button = styled.button`
  width: 200px;
  height: 38px;
  display: inline-block;
  margin-top: 14px;
`;

const Controls = (): JSX.Element => {
  const changeIsSimulation: () => void = useAction(changeIsSimulationAction);
  const isSimulation = useAtom(isSimulationState);

  const state = useAtom(appState);
  const setState: Function = useAction(changeAppState);

  const clickRandomCallback = (): void => {
    setState(makeRandomShot(state));
  };

  useInterval(
    () => {
      document.getElementById('random-button')?.click();
    },
    isSimulation && !state.isGameOver ? SIMULATION_DELAY_MS : null,
  );

  return (
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
        <Button data-testid="simulation-button" onClick={changeIsSimulation}>
          {isSimulation ? 'Stop click simulation' : 'Run click simulation'}
        </Button>
      </div>
    </div>
  );
};

export default Controls;
