import { Entity } from './Entity';
import { Query } from './Query';
import { System } from './System';

export class World {
  entities: Entity[] = [];
  queries: Query[] = [];
  systems: System[] = [];
  entityIndex = 0;

  createEntity() {
    const entity = new Entity();
    entity.id = this.entityIndex;
    this.entities.push(entity);
    this.entityIndex += 1;
    return entity;
  }

  removeEntity(entity: Entity) {
    this.entities.splice(this.entities.indexOf(entity), 1);
  }

  registerSystem(system: System) {
    this.systems.push(system);
    system.world = this;
    system.init();
    return this;
  }

  registerQuery(query: Query) {
    this.queries.push(query);
  }

  execute() {
    this.queries.forEach((query) => {
      const prev = query.entities;
      const next = this.entities.filter((entity) => {
        return query.predicate(entity);
      });

      query.removed = prev.filter((entity) => {
        return next.indexOf(entity) === -1;
      });

      query.added = next.filter((entity) => {
        return prev.indexOf(entity) === -1;
      });

      query.entities = next;
    });

    this.systems.forEach((system) => system.execute());
  }
};
