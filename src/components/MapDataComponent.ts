import { Component } from '../ecs';

type MapDataComponentData = {
  data: {
    x: number;
    y: number;
    type: number;
  }[];
  height: number;
  width: number;
};

export class MapDataComponent extends Component {
  data: {
    x: number;
    y: number;
    type: number;
  }[];
  height: number;
  width: number;

  constructor(data: MapDataComponentData) {
    super();
    this.data = data.data;
    this.height = data.height;
    this.width = data.width;
  }
}
