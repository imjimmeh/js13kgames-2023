import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import {
  addVector,
  approxZeroVector,
  lerpVector,
} from "../../helpers/maths-vectors";
import { Movement } from "../components/movement";
import { Position, PositionName } from "../components/position";

export class MovementSystem extends System {
  accepts(entity: Entity): boolean {
    return (
      entity.components.has(PositionName) && entity.components.has("Movement")
    );
  }

  init(): void {}

  update({ entities }: IEngine): void {
    for (const entity of this.getAcceptedEntities(entities)) {
      const position = entity.components.get<Position>(PositionName)!;
      const movement = entity.components.get<Movement>("Movement")!;

      console.log(movement);

      if (approxZeroVector(movement.vector)) {
        movement.speed.x = 0;
        movement.speed.y = 0;
      } else {
        const newSpeed = lerpVector(
          movement.speed,
          addVector(movement.speed, movement.vector),
          0.75
        );

        movement.speed.x = newSpeed.x;
        movement.speed.y = newSpeed.y;
      }

      position.x += movement.speed.x;
      position.y += movement.speed.y;
    }
  }
}
