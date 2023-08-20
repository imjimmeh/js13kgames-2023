import { WebGl } from "../../../webgl/main";
import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import { PositionName } from "../components/position";

export class WebGlRenderer extends System {
  webgl: WebGl;

  constructor(webgl: WebGl) {
    super();
    this.webgl = webgl;
  }

  accepts(entity: Entity): boolean {
    return (
      entity.components.has("Size") &&
      entity.components.has(PositionName) &&
      entity.components.has("Colour")
    );
  }

  init(): void {}

  update({ entities, systems }: IEngine): void {
    this.webgl.startDraw();

    const drawableEntities = this.getAcceptedEntities(entities);

    //TODO: move this to webgl class?
    for (const material of this.webgl.materials) {
      material.startDraw(this.webgl.gl);
      material.draw(this.webgl.gl, drawableEntities);
    }
  }
}
