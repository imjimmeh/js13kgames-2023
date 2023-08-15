import {
  ControlledBy,
  ControlledByComponent,
} from "../ecs/additions/components/controlled-by";
import { Movement } from "../ecs/additions/components/movement";
import { createRectangle } from "../ecs/additions/shape-factory";
import { InputSystem } from "../ecs/additions/systems/input";
import { MovementSystem } from "../ecs/additions/systems/movement";
import { RendererSystem } from "../ecs/additions/systems/renderer";
import { Engine } from "../ecs/core/engine";
import { Entity } from "../ecs/core/entity";

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
engine.systems.push(new RendererSystem());
engine.init();
