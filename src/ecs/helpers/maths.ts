export const lerp = (start: number, end: number, factor: number) =>
  (start + (end - start)) * factor;

export const approxZero = (n: number) => n < 0.00001 && n > -0.00001;
