import { Components } from "./entity-components";

export class Entity {
  components: Components = new Components();
  name: string = "";

  init(): void {
    for (const component of this.components.all()) {
      console.log(component);
    }

    console.log(`initialised`, this);
  }
}
