import { CellStatus } from '../utils/types';
import styled from 'styled-components';

export const CELL_BORDER_COLOR = '#434343';
export const CELL_SIZE = 40;

interface CellContainerProps {
  cellState: CellStatus;
}

const getCellColor = (cellState: CellStatus): string => {
  switch (cellState) {
    case CellStatus.MISSED:
      return '#cfcaca';
    case CellStatus.SHIP:
      return '#6b99e9';
    case CellStatus.SHIP_BOUNDARY:
      return '#e7ebf6';
    case CellStatus.SHIP_DEAD:
      return '#cb4949';
    case CellStatus.SHIP_SINK:
      return '#f3b81e';
    case CellStatus.EMPTY:
    default:
      return '#ffffff';
  }
};

export const CellContainer = styled.div<CellContainerProps>`
  height: ${CELL_SIZE}px;
  flex: 1 0 ${CELL_SIZE}px;
  border-right: 1px solid ${CELL_BORDER_COLOR};
  border-bottom: 1px solid ${CELL_BORDER_COLOR};
  box-sizing: border-box;
  background-color: ${(props: CellContainerProps): string =>
    getCellColor(props.cellState)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5d5d5d;
`;