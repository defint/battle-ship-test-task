import styled from 'styled-components';
import { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';

export const CellsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, ${CELL_SIZE}px);
  list-style: none;
  padding: 0;
  border-top: 1px solid ${CELL_BORDER_COLOR};
  border-left: 1px solid ${CELL_BORDER_COLOR};
  margin-left: 40px;
`;
