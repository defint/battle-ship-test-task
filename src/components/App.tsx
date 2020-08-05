import React, { useState } from 'react';
import styled from 'styled-components';
import { AREA_SIZE } from '../utils/constants';
import Cell, { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AppState } from '../utils/types';
import { getInitialState } from '../utils/battleground';
import { makeShot } from '../utils/shot';

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
  const [state, setState] = useState<AppState>(getInitialState());

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
    </div>
  );
}

export default App;
