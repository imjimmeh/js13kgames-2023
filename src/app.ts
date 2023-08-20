import {
  ControlledBy,
  ControlledByComponent,
} from "./ecs/additions/components/controlled-by";
import { Movement } from "./ecs/additions/components/movement";
import { createRectangle } from "./ecs/additions/shape-factory";
import { WebGlRenderer } from "./ecs/additions/systems/WebGlRenderer";
import { InputSystem } from "./ecs/additions/systems/input";
import { MovementSystem } from "./ecs/additions/systems/movement";
import { Engine } from "./ecs/core/engine";
import { Entity } from "./ecs/core/entity";
import { WebGl } from "./webgl/main";
import { Material, VariableName } from "./webgl/material";
import { fragmentShader } from "./webgl/shaders/fragment";
import { vertexShader } from "./webgl/shaders/vertex";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (!canvas) throw `Couldn;'t find canvas`;

const materials: Material[] = [
  new Material({
    fragmentShader: fragmentShader,
    name: "Main",
    vertexShader: vertexShader,
    variables: [
      {
        name: VariableName.Position,
        fieldName: "a_position",
        type: "Attribute",
      },
      {
        name: VariableName.Colour,
        fieldName: "u_colour",
        type: "Uniform",
      },
      {
        name: VariableName.Resolution,
        fieldName: "u_resolution",
        type: "Uniform",
      },
    ],
  }),
];

const webgl = new WebGl({ canvas, materials });
webgl.init();

const player = new Entity();
player.name = "Player";

for (const component of createRectangle()) {
  player.components.add(component);
}

player.components.add(new Movement({}));
player.components.add(new ControlledByComponent(ControlledBy.Player));

const engine = new Engine();
engine.entities.push(player);
engine.systems.push(new InputSystem());
engine.systems.push(new MovementSystem());
engine.systems.push(new WebGlRenderer(webgl));
engine.init();
