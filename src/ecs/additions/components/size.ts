import { Component } from "../../core/component";

export interface ISize {
  width: number;
  height: number;
}

export class Size extends Component implements ISize {
  width: number;
  height: number;

  constructor({ width, height }: ISize) {
    super({ name: "Size" });
    this.width = width;
    this.height = height;
  }
}
