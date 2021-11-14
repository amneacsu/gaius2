import { Entity, Query, System } from '../ecs';

import { TestComponent } from '../components/TestComponent';

export class TestSystem extends System {
  testQuery: Query;

  init() {
    const predicate = (entity: Entity) => entity.has(TestComponent);
    this.testQuery = new Query(predicate);
    this.world.registerQuery(this.testQuery);
  }

  execute() {
    this.testQuery.entities.forEach((entity) => {
      console.log('found entity', entity);
    });

    this.testQuery.added.forEach((entity) => {
      console.log('added entity', entity);
    });

    this.testQuery.removed.forEach((entity) => {
      console.log('removed entity', entity);
    });
  }
}
