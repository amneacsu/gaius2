import { Component } from './Component';
import { Class } from './types';

export class Entity {
  id: number;
  components: Component[] = [];

  addComponent(component: Component) {
    this.components.push(component);

    return this;
  }

  removeComponent(componentClass: typeof Component) {
    const index = this.components.findIndex((component) => {
      return component instanceof componentClass;
    });

    this.components.splice(index, 1);

    return this;
  }

  has<T>(componentClass: Class<T>) {
    return Boolean(this.components.find((component) => {
      return component instanceof componentClass;
    }));
  }

  hasAll<T>(...componentClasses: Class<T>[]) {
    return componentClasses.every((componentClass) => {
      return Boolean(this.components.find((component) => {
        return component instanceof componentClass;
      }));
    });
  }

  getComponent<T>(componentClass: Class<T>): T | undefined {
    return this.components.find((component) => {
      return component instanceof componentClass;
    }) as T;
  }
}
