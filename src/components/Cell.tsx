import React from 'react';
import { CellStatus } from '../utils/types';
import { CellContainer } from './CellContainer';
import { useAtom } from '@reatom/react';
import { appState } from '../state/appState';

function Cell({
  onClick,
  cellKey,
}: {
  onClick: Function;
  cellKey: string;
}): JSX.Element {
  const cellState = useAtom(appState, (s) => s.battleground[cellKey], [
    cellKey,
  ]);

  return (
    <CellContainer cellState={cellState} onClick={(): void => onClick()}>
      {[CellStatus.MISSED, CellStatus.SHIP_SINK].includes(cellState) && (
        <span>•</span>
      )}
      {[CellStatus.SHIP_DEAD].includes(cellState) && (
        <span role="img" aria-label="dead">
          💀
        </span>
      )}
    </CellContainer>
  );
}

export default Cell;
