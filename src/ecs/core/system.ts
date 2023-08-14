import { IEngine } from "./engine";
import { Entity } from "./entity";

export abstract class System {
  abstract accepts(entity: Entity): boolean;

  abstract init(): void;

  abstract update({ entities, systems }: IEngine): void;

  getAcceptedEntities(entities: Entity[]): IterableIterator<Entity> {
    return getEntitiesForQuery(entities, this);
  }
}

const getEntitiesForQuery = function* (
  entities: Entity[],
  system: System
): IterableIterator<Entity> {
  for (const entity of entities) {
    if (system.accepts(entity)) {
      yield entity;
    }
  }
};
