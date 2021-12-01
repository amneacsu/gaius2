import { System, Query } from '../ecs';

import { Rng } from '../core/Rng';
import {
  MapDataComponent,
  FrameComponent,
} from '../components';

import { SpriteSystem } from './SpriteSystem';

const spriteSize = 64;
const halfSprite = spriteSize * .5;
const quarterSprite = spriteSize * .25;

const generateMapData = (width: number, height: number) => {
  const rng = new Rng();
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

  return data;
};

export class MapSystem extends System {
  spriteSystem: SpriteSystem;
  mapsQuery: Query;

  init() {
    this.spriteSystem = this.world.getSystem(SpriteSystem)!;

    this.mapsQuery = new Query((entity) => entity.has(MapDataComponent) && entity.has(FrameComponent));
    this.world.registerQuery(this.mapsQuery);

    const width = 16;
    const height = 16;
    const data = generateMapData(width, height);

    this.world.createEntity()
      .addComponent(new FrameComponent({
        x: 0,
        y: 0,
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
    this.mapsQuery.entities.forEach((entity) => {
      const mapData = entity.getComponent(MapDataComponent)!;
      const { data, originX, originY } = mapData;

      const frame = entity.getComponent(FrameComponent)!;
      const surface = frame.surface;
      const halfFrameWidth = frame.w / 2;
      const halfFrameHeight = frame.h / 2;

      surface.clear();

      data.forEach((value) => {
        const x = value.x - originX;
        const y = value.y - originY;
        const newX = (x - y) * halfSprite + halfFrameWidth;
        const newY = (x + y) * quarterSprite + halfFrameHeight;

        if (newX < -spriteSize || newX > (spriteSize + frame.w)) return;
        if (newY < -spriteSize || newY > (spriteSize + frame.h)) return;

        const spriteData = this.spriteSystem.getSpriteData('iso-64x64-building.png', value.type);
        if (spriteData) {
          surface.drawSpriteData(spriteData, newX, newY);
        }
      });
    });
  }
}
