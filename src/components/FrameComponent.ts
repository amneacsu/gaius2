import { Component } from '../ecs';
import { Surface } from '../core/Surface';

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
  surface: Surface;

  constructor(data: FrameComponentData) {
    super();
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;

    this.surface = new Surface(data.w, data.h);
  }
}
