import { World } from './ecs';

import { RendererSystem } from './systems/RendererSystem';
import { MapSystem } from './systems/MapSystem';
import { KeyboardSystem } from './systems/KeyboardSystem';

const world = new World();

world
  .registerSystem(new RendererSystem)
  .registerSystem(new MapSystem)
  .registerSystem(new KeyboardSystem);

setInterval(() => {
  world.execute();
}, 1000 / 60);
