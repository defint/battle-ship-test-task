import React from 'react';
import { CellStatus } from '../utils/types';
import { CellContainer } from './CellContainer';

function Cell({ cellState }: { cellState: CellStatus }): JSX.Element {
  return (
    <CellContainer cellState={cellState}>
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
