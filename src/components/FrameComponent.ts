import { Component } from '../ecs';

type FrameComponentData = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export class FrameComponent extends Component {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(data: FrameComponentData) {
    super();
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;
  }
}
