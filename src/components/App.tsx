import React from 'react';
import styled from 'styled-components';
import { context } from '@reatom/react';
import Controls from './Controls';
import Battleground from './Battleground';
import { createStore } from '@reatom/core';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const store = createStore();

function App(): JSX.Element {
  return (
    <context.Provider value={store}>
      <AppContainer>
        <Controls />
        <Battleground />
      </AppContainer>
    </context.Provider>
  );
}

export default App;
