export abstract class Component implements ComponentFields {
  name: string;

  constructor({ name }: ComponentFields) {
    this.name = name;
  }
}

type ComponentFields = {
  name: string;
};
