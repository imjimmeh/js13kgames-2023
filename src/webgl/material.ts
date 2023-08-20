import { Colour } from "../ecs/additions/components/colour";
import { Position, PositionName } from "../ecs/additions/components/position";
import { Size } from "../ecs/additions/components/size";
import { Entity } from "../ecs/core/entity";
import { resizeCanvasToDisplaySize } from "./helpers/resize-canvas";
import { Shader } from "./shader";

export class Material {
  private _program?: WebGLProgram;
  private _positionLocation?: number;
  private _resolutionLocation?: WebGLUniformLocation;
  private _colourLocation?: WebGLUniformLocation;

  readonly fragmentShader: Shader;
  readonly vertexShader: Shader;
  readonly name: string;

  readonly variables: MaterialVar[];

  constructor({
    fragmentShader,
    name,
    vertexShader,
    variables,
  }: Partial<Material>) {
    if (!fragmentShader || !vertexShader || !variables || !name)
      throw `Shaders must exist`;

    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
    this.variables = variables;
    this.name = name;
  }

  get colourLocation(): WebGLUniformLocation | undefined {
    if (!this._colourLocation) {
      this._colourLocation = this.variables.find(
        (variable) => variable.name == VariableName.Colour
      )?.location;
    }

    return this._colourLocation;
  }

  get positionLocation(): number | undefined {
    if (!this._positionLocation) {
      const position = this.variables.find(
        (variable) => variable.name == VariableName.Position
      );

      if (!position) return undefined;

      this._positionLocation = (position as AttributeMaterialVar).location;
    }

    return this._positionLocation;
  }

  get resolutionLocation(): WebGLUniformLocation | undefined {
    if (!this._resolutionLocation) {
      this._resolutionLocation = this.variables.find(
        (variable) => variable.name == VariableName.Resolution
      )?.location;
    }

    return this._resolutionLocation;
  }

  create(gl: WebGL2RenderingContext) {
    this._createProgram(gl);
    this._findVarLocations(gl);
  }

  startDraw(gl: WebGL2RenderingContext) {
    const positionBuffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(this.positionLocation!);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const size = 2; // 2 components per iteration
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer

    gl.vertexAttribPointer(
      this.positionLocation!,
      size,
      type,
      normalize,
      stride,
      offset
    );

    gl.useProgram(this._program!);
    gl.bindVertexArray(vao);

    gl.uniform2f(this.resolutionLocation!, gl.canvas.width, gl.canvas.height);
  }

  draw(gl: WebGL2RenderingContext, entities: IterableIterator<Entity>) {
    for (const entity of entities) {
      const size = entity.components.get<Size>("Size")!;
      const position = entity.components.get<Position>(PositionName)!;
      const colour = entity.components.get<Colour>("Colour")!;

      const rectangle = createRectangle(
        position.x,
        position.y,
        size.width,
        size.height
      );

      gl.bufferData(gl.ARRAY_BUFFER, rectangle, gl.STATIC_DRAW);

      // Set a random color.
      gl.uniform4f(this.colourLocation!, colour.r, colour.g, colour.b, 1);

      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      gl.drawArrays(primitiveType, offset, count);
    }
  }

  private _createProgram(gl: WebGL2RenderingContext): WebGLProgram {
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

  private _findVarLocations(gl: WebGL2RenderingContext) {
    for (const variable of this.variables) {
      if (variable.type == "Uniform") {
        variable.location =
          gl.getUniformLocation(this._program!, variable.fieldName) ??
          undefined;

        if (!variable.location)
          throw `Error fetching uniform ${variable.fieldName}`;
      } else if (variable.type == "Attribute") {
        variable.location =
          gl.getAttribLocation(this._program!, variable.fieldName) ?? undefined;

        if (variable.location < 0)
          throw `Error fetching attribute ${variable.fieldName}`;
      }
    }
  }
}

export type MaterialVar = AttributeMaterialVar | UniformMaterialVar;

export type AttributeMaterialVar = {
  fieldName: string;
  name: VariableName;
  location?: number;
  type: "Attribute";
};

export type UniformMaterialVar = {
  fieldName: string;
  name: VariableName;
  location?: WebGLUniformLocation;
  type: "Uniform";
};

export enum VariableName {
  Colour,
  Position,
  Resolution,
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
