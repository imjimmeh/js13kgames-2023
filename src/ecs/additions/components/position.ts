import { Component } from "../../core/component";

export class Position extends Component implements IPosition {
  x: number;
  y: number;

  constructor({ x, y }: Partial<Position>) {
    super({ name: "Position" });

    this.x = x ?? 0;
    this.y = y ?? 0;
  }
}

export interface IPosition {
  x: number;
  y: number;
}
