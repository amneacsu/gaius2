import { World } from './ecs';

import { RngSystem } from './systems/RngSystem';
import { SpriteSystem } from './systems/SpriteSystem';
import { RendererSystem } from './systems/RendererSystem';
import { MapSystem } from './systems/MapSystem';
import { MouseSystem } from './systems/MouseSystem';
import { KeyboardSystem } from './systems/KeyboardSystem';
import { WiggleSystem } from './systems/WiggleSystem';

const world = new World();

world
  .registerSystem(new RngSystem)
  .registerSystem(new SpriteSystem)
  .registerSystem(new RendererSystem)
  .registerSystem(new WiggleSystem)
  .registerSystem(new MapSystem)
  .registerSystem(new KeyboardSystem)
  .registerSystem(new MouseSystem);

setInterval(() => {
  world.execute();
}, 1000 / 60);
