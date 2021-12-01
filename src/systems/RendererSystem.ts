import { Query, System } from '../ecs';

import { PositionComponent } from '../components/PositionComponent';
import { throttle } from '../util';
import { SpriteSystem } from './SpriteSystem';

export class RendererSystem extends System {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  spriteSystem: SpriteSystem;
  width: number;
  height: number;

  positionQuery: Query;

  init() {
    this.positionQuery = new Query((entity) => entity.has(PositionComponent));

    this.world.registerQuery(this.positionQuery);

    this.spriteSystem = this.world.getSystem(SpriteSystem)!;

    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d')!;
    this.fillWindow();
    window.addEventListener('resize', throttle(() => this.fillWindow(), 1000));
  }

  fillWindow() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  drawBackground() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  execute() {
    this.drawBackground();

    this.context.fillStyle = '#f00';

    this.positionQuery.entities.forEach((entity) => {
      entity.withComponent(PositionComponent, (pos) => {
        this.drawSprite('iso-64x64-building.png', 0, pos.x, pos.y);
      });
    });
  }

  drawSprite(spritesheet: string, index: number, x: number, y: number) {
    const sprite = this.spriteSystem.getSprite(spritesheet, index);
    if (sprite) {
      this.context.drawImage(sprite.data, x, y);
    }
  }
};
