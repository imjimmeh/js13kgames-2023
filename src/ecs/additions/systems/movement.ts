import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import { Position } from "../components/position";

export class MovementSystem extends System {
  accepts(entity: Entity): boolean {
    return entity.components.has("Position");
  }

  init(): void {}

  update({ entities }: IEngine): void {
    for (const entity of this.getAcceptedEntities(entities)) {
      const location = entity.components.get<Position>("Position")!;
      location.x += 1;
      location.y -= 1;
    }
  }
}
