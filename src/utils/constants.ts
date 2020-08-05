export const AREA_SIZE = 5;

export enum CellStatus {
  EMPTY,
  MISSED,
  SHIP,
  SHIP_BOUNDARY,
  SHIP_SINK,
}

export enum ShipType {
  SINGLE,
  LINE_HORIZONTAL,
  LINE_VERTICAL,
  CURVED_LEFT,
  CURVED_RIGHT,
  CURVED_TOP,
  CURVED_BOTTOM,
}
