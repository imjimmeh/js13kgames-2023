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

export const multiplyVector = (a: Vector, b: number): Vector => {
  return {
    x: a.x * b,
    y: a.y * b,
  };
};

export const approxZeroVector = ({ x, y }: Vector): boolean =>
  approxZero(x) && approxZero(y);

export const clampVector = (v: Vector, min: number, max: number): Vector => {
  return {
    x: Math.min(Math.max(v.x, min), max),
    y: Math.min(Math.max(v.y, min), max),
  };
};
