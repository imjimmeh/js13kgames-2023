import { Component } from "../../core/component";

export class ControlledByComponent extends Component {
  controlledBy: ControlledBy;

  constructor(controlledBy: ControlledBy) {
    super({ name: "ControlledBy" });
    this.controlledBy = controlledBy;
  }
}

export enum ControlledBy {
  Player = "Player",
  AI = "AI",
}
