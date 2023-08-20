import { Shader } from "./shader";

export class Material {
  readonly fragmentShader: Shader;
  readonly vertexShader: Shader;

  readonly variables: MaterialVar[];

  constructor({ fragmentShader, vertexShader, variables }: Partial<Material>) {
    if (!fragmentShader || !vertexShader || !variables)
      throw `Shaders must exist`;

    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
    this.variables = variables;
  }
}

export type MaterialVar = {
  name: string;
  location?: number;
  type: "Attribute" | "Uniform";
};
