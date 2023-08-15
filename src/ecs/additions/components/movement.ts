import { Component } from "../../core/component";
import {
  addVector,
  approxZeroVector,
  lerpVector,
} from "../../helpers/maths-vectors";
import { Vector } from "./position";

export class Movement extends Component {
  vector: Vector;
  speed: Vector;
  maxSpeed: Vector;

  constructor({ vector, speed, maxSpeed }: Partial<Movement>) {
    super({ name: "Movement" });
    this.vector = vector ?? { x: 0, y: 0 };
    this.speed = speed ?? { x: 0, y: 0 };
    this.maxSpeed = maxSpeed ?? { x: 1, y: 1 };
  }

  updateSpeed() {
    if (approxZeroVector(this.vector)) {
      this.speed = { x: 0, y: 0 };
    } else {
      this.speed = lerpVector(
        this.speed,
        addVector(this.speed, this.vector),
        0.75
      );
    }
  }
}
