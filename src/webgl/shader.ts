export class Shader {
  private _compiledShader?: WebGLShader;
  readonly source: string;
  readonly type: ShaderType;

  constructor({ source, type }: Partial<Shader>) {
    if (!source) throw `Source cannot be null`;
    if (!type) throw `Type cannot be null`;

    this.source = source;
    this.type = type;
  }

  get compiledShader(): WebGLShader | undefined {
    return this._compiledShader;
  }

  compileShader(gl: WebGL2RenderingContext): WebGLShader {
    const shader = gl.createShader(this.type);
    if (!shader) throw `Error creating shader`;

    gl.shaderSource(shader, this.source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      this._compiledShader = shader;
      return shader;
    }

    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);

    throw error;
  }
}

export enum ShaderType {
  "Vertex" = 0x8b31,
  "Fragment" = 0x8b30,
}
