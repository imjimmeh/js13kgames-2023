import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import { Movement } from "../components/movement";
import { Position } from "../components/position";

export class MovementSystem extends System {
  accepts(entity: Entity): boolean {
    return (
      entity.components.has("Position") && entity.components.has("Movement")
    );
  }

  init(): void {}

  update({ entities }: IEngine): void {
    for (const entity of this.getAcceptedEntities(entities)) {
      const position = entity.components.get<Position>("Position")!;
      const movement = entity.components.get<Movement>("Movement")!;

      //TODO: Calculate actual speed and use that
      position.x += movement.vector.x;
      position.y += movement.vector.y;
    }
  }
}
