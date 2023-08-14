import { Colour } from "./components/colour";
import { Position } from "./components/position";
import { Size } from "./components/size";

function* createRectangle() {
  yield new Colour({ r: 255, g: 0, b: 0, a: 255 });
  yield new Position({ x: 0, y: 0 });
  yield new Size({ width: 200, height: 200 });
}

export { createRectangle };
