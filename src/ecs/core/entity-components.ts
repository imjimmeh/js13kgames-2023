import { Component } from "./component";

export class Components {
  private components: Map<string, Component> = new Map<string, Component>();

  add(component: Component): void {
    this.components.set(component.name, component);
  }

  get<T>(name: string): T | undefined {
    const component = this.components.get(name);
    if (!component) return undefined;

    return component as T;
  }

  has(name: string): boolean {
    return this.components.has(name);
  }

  all(): IterableIterator<Component> {
    return this.components.values();
  }
}
