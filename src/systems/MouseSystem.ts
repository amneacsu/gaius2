import { Entity, System, Query } from '../ecs';

import { WiggleComponent, ClickableComponent, MouseComponent, ScreenPositionComponent } from '../components';
import { RendererSystem } from './RendererSystem';

export class MouseSystem extends System {
  renderer: RendererSystem;

  clickableQuery: Query;
  mouseQuery: Query;

  listeners: {
    clickable: any;
    cb: any;
    entityId: number;
  }[] = [];

  init() {
    this.clickableQuery = new Query((entity) => {
      return entity.has(ClickableComponent);
    });

    this.mouseQuery = new Query((entity) => {
      return entity.has(MouseComponent) && entity.has(ScreenPositionComponent);
    });

    this.world.registerQuery(this.clickableQuery);
    this.world.registerQuery(this.mouseQuery);

    this.world.createEntity()
      .addComponent(new MouseComponent)
      .addComponent(new WiggleComponent)
      .addComponent(new ScreenPositionComponent(0, 0));

    this.renderer = this.world.getSystem(RendererSystem)!;

    this.renderer.canvas.addEventListener('click', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const area = this.listeners.find((listeners) => {
        const a = listeners.clickable;
        return x >= a.x1 && x <= a.x2
          && y >= a.y1 && y <= a.y2;
      });

      if (area) area.cb();
    });
  }

  execute() {
    this.clickableQuery.removed.forEach((entity) => {
      const index = this.listeners.findIndex((listener) => {
        return listener.entityId === entity.id;
      });
      this.listeners.splice(index, 1);
    });

    this.mouseQuery.added.forEach((entity) => {
      this.renderer.canvas.addEventListener('mousemove', (event) => {
        const pos = entity.getComponent(ScreenPositionComponent);
        if (pos) {
          pos.x = event.offsetX;
          pos.y = event.offsetY;
        }
      });
    });

    this.mouseQuery.entities.forEach((entity) => {
      const pos = entity.getComponent(ScreenPositionComponent)!;
      this.renderer.context.fillStyle = '#fff';
      this.renderer.context.fillRect(pos.x, pos.y, 10, 10);
    });
  }

  registerClickableArea(entity: Entity, cb: any) {
    this.listeners.push({
      entityId: entity.id,
      clickable: entity.getComponent(ClickableComponent),
      cb,
    });
  }
};
