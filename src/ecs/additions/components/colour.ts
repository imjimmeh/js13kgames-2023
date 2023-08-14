import { Component } from "../../core/component";

export interface IColour {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Colour extends Component implements IColour {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor({ r, g, b, a }: IColour) {
    super({ name: "Colour" });
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.toRgb = this.toRgb.bind(this);
  }

  toRgb = (): string => `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
}
