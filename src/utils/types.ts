export type BattlegroundState = { [key: string]: CellStatus };

export enum CellStatus {
  EMPTY,
  MISSED,
  SHIP,
  SHIP_BOUNDARY,
  SHIP_SINK,
}

export enum ShipModel {
  SINGLE,
  LINE,
  CURVED,
}

export enum ShipRotation {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

export interface ShipType {
  model: ShipModel;
  rotation: ShipRotation;
  reverse: boolean;
}

export interface Ship {
  type: ShipType;
  parts: BattlegroundState;
}

export interface AppState {
  battleground: BattlegroundState;
  isGameOver: boolean;
  ships: Ship[];
}

export type ShipScheme = (x: number, y: number) => string[];
