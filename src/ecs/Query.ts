import { Entity } from './Entity';
import { QueryPredicate } from './types';

export class Query {
  predicate: QueryPredicate;
  entities: Entity[] = [];
  added: Entity[] = [];
  removed: Entity[] = [];

  constructor(predicate: QueryPredicate) {
    this.predicate = predicate;
  }
}
