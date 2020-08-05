import { CellStatus, ShipType } from './constants';

export type BattlegroundState = { [key: string]: CellStatus };

export interface Ship {
  type: ShipType;
  parts: BattlegroundState;
}

export interface AppState {
  battleground: BattlegroundState;
  isGameOver: boolean;
  ships: Ship[];
}
