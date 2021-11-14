import { Entity } from './Entity';

export type QueryPredicate = (entity: Entity) => boolean;

export type Class<T> = {
  new(...args: any[]): T;
};
