import { createRectangle } from "../ecs/additions/shape-factory";
import { MovementSystem } from "../ecs/additions/systems/movement";
import { RendererSystem } from "../ecs/additions/systems/renderer";
import { Engine } from "../ecs/core/engine";
import { Entity } from "../ecs/core/entity";

const player = new Entity();
player.name = "Player";

for (const component of createRectangle()) {
  player.components.add(component);
}

const engine = new Engine();
engine.entities.push(player);
engine.systems.push(new MovementSystem());
engine.systems.push(new RendererSystem());
engine.init();
