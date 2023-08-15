import { Entity } from "../core/entity";
import { PositionName } from "./components/position";

const isRenderable = (entity: Entity): boolean =>
  entity.components.has(PositionName) &&
  entity.components.has("Colour") &&
  entity.components.has("Size");

export { isRenderable };
