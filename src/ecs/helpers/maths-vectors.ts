import { Vector } from "../additions/components/position";
import { approxZero, lerp } from "./maths";

export const lerpVector = (a: Vector, b: Vector, factor: number): Vector => {
  const x = lerp(a.x, b.x, factor);
  const y = lerp(a.y, b.y, factor);

  return {
    x,
    y,
  };
};

export const addVector = (a: Vector, b: Vector): Vector => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
};

export const approxZeroVector = ({ x, y }: Vector): boolean =>
  approxZero(x) && approxZero(y);
