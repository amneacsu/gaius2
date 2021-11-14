import { System } from '../ecs';

import { Rng } from '../core/Rng';

export class RngSystem extends System {
  rng: Rng;

  init() {
    this.rng = new Rng(1);
  }

  execute() {

  }
};
