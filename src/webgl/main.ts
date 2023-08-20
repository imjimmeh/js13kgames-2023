import { resizeCanvasToDisplaySize } from "./helpers/resize-canvas";
import { Material } from "./material";

export class WebGl {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;

  materials: Material[] = [];

  constructor({
    canvas,
    materials,
  }: {
    canvas: HTMLCanvasElement;
    materials: Material[];
  }) {
    this.canvas = canvas;

    const gl = canvas.getContext("webgl2");

    if (!gl) throw `Could not find WebGL2 context`;

    this.gl = gl;

    this.materials = materials;
  }

  init() {
    for (const material of this.materials) {
      material.create(this.gl);
    }
  }

  startDraw() {
    resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}
