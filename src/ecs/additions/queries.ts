import { Entity } from "../core/entity";

const isRenderable = (entity: Entity): boolean =>
  entity.components.has("Position") &&
  entity.components.has("Colour") &&
  entity.components.has("Size");

export { isRenderable };
