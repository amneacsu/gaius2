import { System, Query } from '../ecs';

import { MapCameraComponent } from '../components';

export class KeyboardSystem extends System {
  keyDown: Record<string, boolean> = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  mapViewQuery: Query;

  init() {
    this.mapViewQuery = new Query((entity) => {
      return entity.has(MapCameraComponent);
    });

    this.world.registerQuery(this.mapViewQuery);

    window.addEventListener('keydown', (event) => {
      if (this.keyDown.hasOwnProperty(event.code)) {
        this.keyDown[event.code] = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (this.keyDown.hasOwnProperty(event.code)) {
        this.keyDown[event.code] = false;
      }
    });
  }

  execute() {
    this.mapViewQuery.entities.forEach((entity) => {
      entity.withComponent(MapCameraComponent, (mapCamera) => {
        let deltaX = 0;
        let deltaY = 0;
        const step = .5;
        if (this.keyDown.ArrowUp) { deltaX -= step; deltaY -= step; }
        if (this.keyDown.ArrowDown) { deltaX += step; deltaY += step; }
        if (this.keyDown.ArrowLeft) { deltaX -= step; deltaY += step; }
        if (this.keyDown.ArrowRight) { deltaX += step; deltaY -= step; }

        mapCamera.originX += deltaX;
        mapCamera.originY += deltaY;
      });
    });
  }
};
