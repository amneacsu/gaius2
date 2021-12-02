import { System, Query } from '../ecs';

import { Rng } from '../core/Rng';
import { Sprite } from '../core/Sprite';
import {
  MapCameraComponent,
  MapDataComponent,
  FrameComponent,
} from '../components';

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
  mapsQuery: Query;

  init() {
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
        width,
        height,
        data,
      }))
      .addComponent(new MapCameraComponent({
        originX: 8,
        originY: 8,
      }));
  }

  execute() {
    this.mapsQuery.entities.forEach((entity) => {
      const mapData = entity.getComponent(MapDataComponent)!;
      const { data } = mapData;

      const mapCamera = entity.getComponent(MapCameraComponent)!;
      const { originX, originY } = mapCamera;

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

        const sprite = new Sprite('map1', value.type);
        surface.drawSpriteData(sprite.data, newX, newY);
      });
    });
  }
}
