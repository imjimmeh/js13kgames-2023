import { resizeCanvasToDisplaySize } from "./helpers/resize-canvas";
import { Program } from "./program";
import { ShaderVars } from "./shaders/constants";
import { fragmentShader } from "./shaders/fragment";
import { vertexShader } from "./shaders/vertex";

export class WebGl {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;

  program: Program;

  colourLocation?: WebGLUniformLocation;
  positionLocation?: number;
  resolutionLocation?: WebGLUniformLocation;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas;

    const gl = canvas.getContext("webgl2");

    if (!gl) throw `Could not find WebGL2 context`;

    this.gl = gl;
    this.program = new Program({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    this.program.create(this.gl);
  }

  init() {
    const program = this.program.program!;

    this.getPositionLocation(program);
    this.getResolutionLocation(program);
    this.getColourLocation(program);

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = this.gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
  }

  //TODO: Move most/all this to program
  startDraw() {
    const vao = this.gl.createVertexArray();

    // and make it the one we're currently working with
    this.gl.bindVertexArray(vao);

    // Turn on the attribute
    this.gl.enableVertexAttribArray(this.positionLocation!);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2; // 2 components per iteration
    const type = this.gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      this.positionLocation!,
      size,
      type,
      normalize,
      stride,
      offset
    );

    resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);

    // Tell WebGL how to convert from clip space to pixels
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.program.program!);
    this.gl.uniform2f(
      this.resolutionLocation!,
      this.gl.canvas.width,
      this.gl.canvas.height
    );
    // Bind the attribute/buffer set we want.
    this.gl.bindVertexArray(vao);
  }

  private getResolutionLocation(program: WebGLProgram) {
    this.resolutionLocation =
      this.gl.getUniformLocation(program, ShaderVars.Resolution) ?? undefined;

    if (!this.resolutionLocation) throw `Could not get resolution location`;
  }

  private getColourLocation(program: WebGLProgram) {
    this.colourLocation =
      this.gl.getUniformLocation(program, ShaderVars.Colour) ?? undefined;

    if (!this.colourLocation) throw `Could not find colour uniform`;
  }

  private getPositionLocation(program: WebGLProgram) {
    this.positionLocation = this.gl.getAttribLocation(
      program,
      ShaderVars.Position
    );
    if (this.positionLocation < 0) throw `Could not find position attribute`;
  }
}
