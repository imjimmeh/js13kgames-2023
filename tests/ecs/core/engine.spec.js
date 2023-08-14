import { Entity } from "../../../src/ecs/core/entity";
import { Engine } from "../../../src/ecs/core/engine";
jest.mock("../../../src/ecs/core/entity");

let engine;

beforeEach(() => {
  Entity.mockClear();

  engine = new Engine();

  const entity = new Entity();
  engine.entities.push(entity);
});

it("should init entities", () => {
  engine.init();

  const entityInstance = Entity.mock.instances[0];
  expect(entityInstance.init).toHaveBeenCalledTimes(1);
});
