import { Shader, ShaderType } from "../shader";

const shaderSource = `#version 300 es
     
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
uniform vec4 u_colour;

// we need to declare an output for the fragment shader
out vec4 outColour;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColour = u_colour;
}`;

export const fragmentShader = new Shader({
  source: shaderSource,
  type: ShaderType.Fragment,
});
