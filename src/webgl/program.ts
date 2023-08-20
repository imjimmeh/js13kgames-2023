import { Shader } from "./shader";

export class Program {
  private _program?: WebGLProgram;
  readonly fragmentShader: Shader;
  readonly vertexShader: Shader;

  constructor({ fragmentShader, vertexShader }: Partial<Program>) {
    if (!fragmentShader || !vertexShader) throw `Shaders must exist`;

    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
  }

  get program(): WebGLProgram | undefined {
    return this._program;
  }

  create(gl: WebGL2RenderingContext): WebGLProgram {
    const program = gl.createProgram();

    if (!program) throw `Error creating program`;

    gl.attachShader(program, this.vertexShader.compileShader(gl));
    gl.attachShader(program, this.fragmentShader.compileShader(gl));
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      this._program = program;
      return program;
    }

    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw error;
  }
}
