import { Component } from "../../core/component";

export const PositionName = "Position";

export class Position extends Component implements Vector {
  x: number;
  y: number;

  constructor({ x, y }: Partial<Position>) {
    super({ name: PositionName });

    this.x = x ?? 0;
    this.y = y ?? 0;
  }
}

export type Vector = {
  x: number;
  y: number;
};
