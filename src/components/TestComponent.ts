import { Component } from '../ecs';

export class TestComponent extends Component {
  x: number;

  constructor(x: number) {
    super();
    this.x = x;
  }
}
