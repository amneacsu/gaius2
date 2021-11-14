import { Component } from '../ecs';

type MapDataComponentData = {
  data: {
    x: number;
    y: number;
    type: number;
  }[];
  height: number;
  width: number;
  originX: number;
  originY: number;
};

export class MapDataComponent extends Component {
  data: {
    x: number;
    y: number;
    type: number;
  }[];
  height: number;
  width: number;
  originX: number;
  originY: number;

  constructor(data: MapDataComponentData) {
    super();
    this.data = data.data;
    this.height = data.height;
    this.width = data.width;
    this.originX = data.originX;
    this.originY = data.originY;
  }
}
