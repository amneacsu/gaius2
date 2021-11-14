import { System, Query } from '../ecs';

import { MapDataComponent, FrameComponent } from '../components';

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
      return entity.has(MapDataComponent) && entity.has(FrameComponent);
    });

    this.world.registerQuery(this.mapViewQuery);
  }

  execute() {
    // console.log('exec');
    this.mapViewQuery.added.forEach((entity) => {
      window.addEventListener('keydown', (event) => {
        if (this.keyDown.hasOwnProperty(event.code)) {
          this.keyDown[event.code] = true;
        } else {
          switch (event.code) {
            case 'Space': {
              const map = entity.getComponent(MapDataComponent)!;
              const index = Math.round(map.originX) + Math.round(map.originY) * map.width;
              const current = map.data[index].type;
              map.data[index].type = current === 0 ? 2 : 0;
            }
          }
        }
      });

      window.addEventListener('keyup', (event) => {
        if (this.keyDown.hasOwnProperty(event.code)) {
          this.keyDown[event.code] = false;
        }
      });
    });

    this.mapViewQuery.entities.forEach((entity) => {
      const map = entity.getComponent(MapDataComponent)!;
      let deltaX = 0;
      let deltaY = 0;
      const step = .5;
      if (this.keyDown.ArrowUp) { deltaX -= step; deltaY -= step; }
      if (this.keyDown.ArrowDown) { deltaX += step; deltaY += step; }
      if (this.keyDown.ArrowLeft) { deltaX -= step; deltaY += step; }
      if (this.keyDown.ArrowRight) { deltaX += step; deltaY -= step; }

      map.originX += deltaX;
      map.originY += deltaY;
    });
  }
};
