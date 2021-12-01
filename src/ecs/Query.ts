import { Entity } from './Entity';

export type QueryPredicate = (entity: Entity) => boolean;

export class Query {
  predicate: QueryPredicate;
  entities: Entity[] = [];
  added: Entity[] = [];
  removed: Entity[] = [];

  constructor(predicate: QueryPredicate) {
    this.predicate = predicate;
  }
}
