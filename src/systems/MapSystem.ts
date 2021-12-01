import { System, Query } from '../ecs';

import { Surface } from '../core/Surface';
import {
  MapDataComponent,
  FrameComponent,
} from '../components';

import { RngSystem } from './RngSystem';
import { RendererSystem } from './RendererSystem';
import { SpriteSystem } from './SpriteSystem';

const spriteSize = 64;
const halfSprite = spriteSize * .5;
const quarterSprite = spriteSize * .25;

export class MapSystem extends System {
  renderer: RendererSystem;
  spriteSystem: SpriteSystem;
  mapsQuery: Query;

  surfaces: (Surface | undefined)[] = [];

  init() {
    this.renderer = this.world.getSystem(RendererSystem)!;
    this.spriteSystem = this.world.getSystem(SpriteSystem)!;

    this.mapsQuery = new Query((entity) => entity.has(MapDataComponent) && entity.has(FrameComponent));
    this.world.registerQuery(this.mapsQuery);

    const rng = this.world.getSystem(RngSystem)!.rng;
    const width = 480;
    const height = 320;
    const data = [];
    for (let index = 0; index < width * height; index += 1) {
      const x = index % width;
      const y = ~~(index / width);
      data.push({
        x,
        y,
        type: rng.sample([0, 2]),
      });
    }

    this.world.createEntity()
      .addComponent(new FrameComponent({
        x: 200,
        y: 10,
        w: 600,
        h: 576,
      }))
      .addComponent(new MapDataComponent({
        originX: 8,
        originY: 8,
        width,
        height,
        data,
      }));
  }

  execute() {
    this.mapsQuery.added.forEach((entity) => {
      entity.withComponent(FrameComponent, (frame) => {
        this.surfaces[entity.id] = new Surface(frame.w, frame.h);
      });
    });

    this.mapsQuery.removed.forEach((entity) => {
      this.surfaces[entity.id] = undefined;
    });

    this.mapsQuery.entities.forEach((entity) => {
      const surface = this.surfaces[entity.id]!;
      surface.clear();
      const mapData = entity.getComponent(MapDataComponent)!;
      const { data, originX, originY } = mapData;

      const frame = entity.getComponent(FrameComponent)!;
      const halfFrameWidth = frame.w / 2;
      const halfFrameHeight = frame.h / 2;

      data.forEach((value) => {
        const x = value.x - originX;
        const y = value.y - originY;
        const newX = (x - y) * halfSprite + halfFrameWidth;
        const newY = (x + y) * quarterSprite + halfFrameHeight;

        if (newX < -spriteSize || newX > (spriteSize + frame.w)) return;
        if (newY < -spriteSize || newY > (spriteSize + frame.h)) return;

        const spriteIndex = value.type;

        this.spriteSystem.drawSprite(surface.context, 'iso-64x64-building.png', spriteIndex, newX, newY);
      });

      this.renderer.drawBackground();
      this.renderer.context.drawImage(surface.canvas, frame.x, frame.y);
    });
  }
}
