import { Component } from "../../core/component";
import { approxZero } from "../../helpers/maths";
import {
  addVector,
  approxZeroVector,
  lerpVector,
  multiplyVector,
} from "../../helpers/maths-vectors";
import { Vector } from "./position";

export const MovementName = "Movement";

export class Movement extends Component {
  vector: Vector;
  acceleration: Vector = { x: 0, y: 0 };
  velocity: Vector = { x: 0, y: 0 };
  maxSpeed: number;

  constructor({ vector, maxSpeed }: Partial<Movement>) {
    super({ name: MovementName });
    this.vector = vector ?? { x: 0, y: 0 };
    this.maxSpeed = maxSpeed ?? 2;
  }

  updateSpeed() {
    if (approxZero(this.vector.x)) {
      this.velocity.x = 0;
      this.acceleration.x = 0;
    }
    if (approxZero(this.vector.y)) {
      this.velocity.y = 0;
      this.acceleration.y = 0;
    }

    if (approxZeroVector(this.vector)) {
      return;
    }

    this.acceleration = addVector(
      this.acceleration,
      multiplyVector(this.vector, 0.1)
    );

    this.velocity = lerpVector(
      this.velocity,
      addVector(this.velocity, this.acceleration),
      1
    );

    const negativeMaxSpeed = this.maxSpeed * -1;

    if (this.velocity.x > this.maxSpeed) {
      this.velocity.x = this.maxSpeed;
    } else if (this.velocity.x < negativeMaxSpeed) {
      this.velocity.x = negativeMaxSpeed;
    }

    if (this.velocity.y > this.maxSpeed) {
      this.velocity.y = this.maxSpeed;
    } else if (this.velocity.y < negativeMaxSpeed) {
      this.velocity.y = negativeMaxSpeed;
    }
  }
}
