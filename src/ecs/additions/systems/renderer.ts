import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { instance } from "../../core/renderer";
import { System } from "../../core/system";
import { Colour } from "../components/colour";
import { Position } from "../position";
import { isRenderable } from "../queries";
import { Size } from "../size";

const shapeRendererUpdate = (entity: Entity): void => {
  const size = entity.components.get<Size>("Size");
  const position = entity.components.get<Position>("Position");
  const colour = entity.components.get<Colour>("Colour");

  instance.context.fillStyle = colour!.toRgb();

  instance.context.fillRect(
    position!.x,
    position!.y,
    size!.width,
    size!.height
  );
};

export class RendererSystem extends System {
  accepts(entity: Entity): boolean {
    return (
      entity.components.has("Size") &&
      entity.components.has("Position") &&
      entity.components.has("Colour")
    );
  }

  init(): void {}
  update({ entities, systems }: IEngine): void {
    instance.clearCanvas();

    for (const entity of this.getAcceptedEntities(entities)) {
      shapeRendererUpdate(entity);
    }
  }
}
