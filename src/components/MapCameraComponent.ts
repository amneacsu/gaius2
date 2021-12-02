import { Component } from '../ecs';

type MapCameraComponentData = {
  originX: number;
  originY: number;
};

export class MapCameraComponent extends Component {
  originX: number;
  originY: number;

  constructor(data: MapCameraComponentData) {
    super();
    this.originX = data.originX;
    this.originY = data.originY;
  }
}
