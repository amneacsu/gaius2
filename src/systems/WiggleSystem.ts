import { System, Query } from '../ecs';
import { ScreenPositionComponent, WiggleComponent } from '../components';
import { RngSystem } from './RngSystem';

export class WiggleSystem extends System {
  wiggleQuery: Query;

  init() {
    this.wiggleQuery = new Query((entity) => {
      return entity.has(ScreenPositionComponent) && entity.has(WiggleComponent);
    });

    this.world.registerQuery(this.wiggleQuery);
  }

  execute() {
    this.wiggleQuery.entities.forEach((entity) => {
      const rng = this.world.getSystem(RngSystem)!.rng;
      const position = entity.getComponent(ScreenPositionComponent)!;
      position.x += rng.int(-1, 1);
      position.y += rng.int(-1, 1);
    });
  }
};
