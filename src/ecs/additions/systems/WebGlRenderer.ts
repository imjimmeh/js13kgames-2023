import { WebGl } from "../../../webgl/main";
import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import { Colour } from "../components/colour";
import { Position, PositionName } from "../components/position";
import { Size } from "../components/size";

export class WebGlRenderer extends System {
  webgl: WebGl;

  constructor(webgl: WebGl) {
    super();
    this.webgl = webgl;
  }

  accepts(entity: Entity): boolean {
    return (
      entity.components.has("Size") &&
      entity.components.has(PositionName) &&
      entity.components.has("Colour")
    );
  }

  init(): void {}

  update({ entities, systems }: IEngine): void {
    this.webgl.startDraw();

    for (const entity of this.getAcceptedEntities(entities)) {
      const size = entity.components.get<Size>("Size")!;
      const position = entity.components.get<Position>(PositionName)!;
      const colour = entity.components.get<Colour>("Colour")!;

      const rectangle = createRectangle(
        position.x,
        position.y,
        size.width,
        size.height
      );
      this.webgl.gl.bufferData(
        this.webgl.gl.ARRAY_BUFFER,
        rectangle,
        this.webgl.gl.STATIC_DRAW
      );

      // Set a random color.
      this.webgl.gl.uniform4f(
        this.webgl.colourLocation!,
        colour.r,
        colour.g,
        colour.b,
        1
      );

      // Draw the rectangle.
      var primitiveType = this.webgl.gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      this.webgl.gl.drawArrays(primitiveType, offset, count);
    }
  }
}

const createRectangle = (
  x: number,
  y: number,
  width: number,
  height: number
): Float32Array => {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  return new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]);
};
