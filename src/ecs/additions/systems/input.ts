import { IEngine } from "../../core/engine";
import { Entity } from "../../core/entity";
import { System } from "../../core/system";
import {
  ControlledBy,
  ControlledByComponent,
} from "../components/controlled-by";
import { Movement } from "../components/movement";

export class InputSystem extends System {
  keyStates: Map<string, KeyState> = new Map<string, KeyState>();

  constructor() {
    super();
    this.init = this.init.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  accepts(entity: Entity): boolean {
    const component =
      entity.components.get<ControlledByComponent>("ControlledBy");

    if (!component) return false;

    return (
      component.controlledBy == ControlledBy.Player &&
      entity.components.has("Movement")
    );
  }

  init(): void {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  update({ entities }: IEngine): void {
    for (const state of this.keyStates) {
      if (state[1] == KeyState.Pressed) {
        this.keyStates.set(state[0], KeyState.Held);
      }
    }

    const xDirection = this.getAxisVector("ArrowLeft", "ArrowRight");
    const yDirection = this.getAxisVector("ArrowUp", "ArrowDown");

    for (const entity of this.getAcceptedEntities(entities)) {
      const movement = entity.components.get<Movement>("Movement");
      movement!.vector.y = yDirection;
      movement!.vector.x = xDirection;
    }
  }

  private getAxisVector(positiveKey: string, negativeKey: string) {
    const up =
      (this.keyStates.get(positiveKey) ?? KeyState.Released) !=
      KeyState.Released
        ? 1
        : 0;

    const down =
      (this.keyStates.get(negativeKey) ?? KeyState.Released) !=
      KeyState.Released
        ? -1
        : 0;

    return up + down;
  }

  onKeyDown(event: KeyboardEvent) {
    this.keyStates.set(event.key, KeyState.Pressed);
  }

  onKeyUp(event: KeyboardEvent) {
    this.keyStates.set(event.key, KeyState.Released);
  }
}

enum KeyState {
  Released = "Released",
  Pressed = "Pressed",
  Held = "Held",
}
