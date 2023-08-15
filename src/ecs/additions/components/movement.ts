import { Component } from "../../core/component";
import { Position } from "./position";

export class Movement extends Component {
  vector: Position;
  speed: Position;

  constructor({ vector, speed }: Partial<Movement>) {
    super({ name: "Movement" });
    this.vector = vector ?? new Position({ x: 0, y: 0 });
    this.speed = speed ?? new Position({ x: 0, y: 0 });
  }
}
