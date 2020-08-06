import React from 'react';
import { render, fireEvent, getNodeText } from '@testing-library/react';
import App from './App';

test('', () => {
  const { getByTestId } = render(<App />);
  const buttonSimulation = getByTestId('simulation-button');

  expect(buttonSimulation).toBeInTheDocument();

  expect(getNodeText(buttonSimulation)).toBe('Run click simulation');

  fireEvent(
    buttonSimulation,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(getNodeText(buttonSimulation)).toBe('Stop click simulation');

  fireEvent(
    buttonSimulation,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  expect(getNodeText(buttonSimulation)).toBe('Run click simulation');
});
