import { Query, System } from '../ecs';

import { FrameComponent } from '../components';
import { throttle } from '../util';
import { Surface } from '../core/Surface';

export class RendererSystem extends System {
  context: CanvasRenderingContext2D;
  surface: Surface;
  frameQuery: Query;

  init() {
    this.frameQuery = new Query((entity) => {
      return entity.has(FrameComponent);
    });

    this.world.registerQuery(this.frameQuery);

    const surface = new Surface();
    this.surface = surface;

    this.context = surface.context;

    const fillWindow = () => {
      surface.canvas.width = window.innerWidth;
      surface.canvas.height = window.innerHeight;
    };
    fillWindow();

    document.body.appendChild(surface.canvas);
    window.addEventListener('resize', throttle(() => fillWindow(), 1000));
  }

  execute() {
    this.surface.fill('#000');

    this.frameQuery.entities.forEach((entity) => {
      entity.withComponent(FrameComponent, (frame) => {
        this.context.drawImage(frame.surface.canvas, frame.x, frame.y);
      });
    });
  }
};
