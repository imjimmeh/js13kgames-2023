import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import { Movement, MovementName } from "../components/movement";
import { Position, PositionName } from "../components/position";

export class MovementSystem extends System {
  accepts(entity: Entity): boolean {
    return (
      entity.components.has(PositionName) && entity.components.has(MovementName)
    );
  }

  init(): void {}

  update({ entities }: IEngine): void {
    for (const entity of this.getAcceptedEntities(entities)) {
      const position = entity.components.get<Position>(PositionName)!;
      const movement = entity.components.get<Movement>(MovementName)!;

      movement.updateSpeed();

      position.x += movement.acceleration.x;
      position.y += movement.acceleration.y;
    }
  }
}
