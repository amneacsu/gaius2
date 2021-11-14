import { World } from './World';

export abstract class System {
  world: World;

  abstract execute(): void;
  init() {}
}
