import styled from 'styled-components';
import { CELL_BORDER_COLOR, CELL_SIZE } from './Cell';
import { AREA_SIZE } from '../utils/constants';

export const CellsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  width: ${CELL_SIZE * AREA_SIZE}px;
  border-top: 1px solid ${CELL_BORDER_COLOR};
  border-left: 1px solid ${CELL_BORDER_COLOR};
  margin-left: 40px;
`;
