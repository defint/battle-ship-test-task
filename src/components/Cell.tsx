import React from 'react';
import styled from 'styled-components';
import { CellStatus } from '../constants';

export const CELL_BORDER_COLOR = '#434343';
export const CELL_SIZE = 60;

interface CellContainerProps {
  cellState: CellStatus;
}

const getCellColor = (cellState: CellStatus): string => {
  switch (cellState) {
    case CellStatus.MISSED:
      return '#9F9F9F';
    case CellStatus.EMPTY:
    default:
      return '#ffffff';
  }
};

const CellContainer = styled.div<CellContainerProps>`
  height: ${CELL_SIZE}px;
  flex: 1 0 ${CELL_SIZE}px;
  border-right: 1px solid ${CELL_BORDER_COLOR};
  border-bottom: 1px solid ${CELL_BORDER_COLOR};
  box-sizing: border-box;
  background-color: ${(props: CellContainerProps): string =>
    getCellColor(props.cellState)};
`;

function Cell({ cellState }: { cellState: CellStatus }): JSX.Element {
  return <CellContainer cellState={cellState} />;
}

export default Cell;
