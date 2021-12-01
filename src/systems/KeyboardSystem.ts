import { System, Query } from '../ecs';

import { MapDataComponent } from '../components';

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
      return entity.has(MapDataComponent);
    });

    this.world.registerQuery(this.mapViewQuery);
  }

  execute() {
    this.mapViewQuery.added.forEach((entity) => {
      window.addEventListener('keydown', (event) => {
        if (this.keyDown.hasOwnProperty(event.code)) {
          this.keyDown[event.code] = true;
        } else {
          switch (event.code) {
            case 'Space':
              entity.withComponent(MapDataComponent, (map) => {
                const index = Math.round(map.originX) + Math.round(map.originY) * map.width;
                const current = map.data[index].type;
                map.data[index].type = current === 0 ? 2 : 0;
              });
              break;
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
      entity.withComponent(MapDataComponent, (map) => {
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
    });
  }
};
