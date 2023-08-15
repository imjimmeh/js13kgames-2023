import { Entity } from "./entity";
import { instance } from "./renderer";
import { System } from "./system";

export class Engine implements IEngine {
  systems: System[] = [];
  entities: Entity[] = [];

  constructor() {
    this.update = this.update.bind(this);
  }

  init() {
    instance().init();

    for (const entity of this.entities) {
      entity.init();
    }

    for (const system of this.systems) {
      system.init();
    }

    window.requestAnimationFrame(this.update);
  }

  update() {
    for (const system of this.systems) {
      system.update({ entities: this.entities, systems: this.systems });
    }

    console.log(`ran update`);

    window.requestAnimationFrame(this.update);
  }
}

export interface IEngine {
  systems: System[];
  entities: Entity[];
}
