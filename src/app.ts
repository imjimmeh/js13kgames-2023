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

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (!canvas) throw `Couldn;'t find canvas`;

const webgl = new WebGl({ canvas });
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
