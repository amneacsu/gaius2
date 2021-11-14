import { System } from '../ecs';

import spriteSheets from '../data/sprites.js';

type Sprite = {
  filename: string;
  index: number;
  data: ImageBitmap;
};

export class SpriteSystem extends System {
  sprites: Sprite[] = [];

  init() {
    spriteSheets.forEach((spriteSheet) => {
      const image = new Image();
      image.src = `assets/${spriteSheet.filename}`;

      image.onload = () => {
        const spriteCountH = image.width / spriteSheet.width;
        const spriteCountV = image.height / spriteSheet.height;
        const total = spriteCountH * spriteCountV;

        for (let index = 0; index < total; index += 1) {
          const x = index % spriteCountH;
          const y = ~~(index / spriteCountH);

          createImageBitmap(
            image,
            x * spriteSheet.width,
            y * spriteSheet.height,
            spriteSheet.width,
            spriteSheet.height,
          )
            .then((data) => {
              const sprite: Sprite = {
                filename: spriteSheet.filename,
                index,
                data,
              };

              this.sprites.push(sprite);
            });
        }
      };
    });
  }

  execute() {

  }

  getSprite(filename: string, index: number) {
    return this.sprites.find((sprite) => {
      return sprite.filename === filename && sprite.index === index;
    });
  }

  drawSprite(context: CanvasRenderingContext2D, filename: string, index: number, x: number, y: number) {
    const sprite = this.getSprite(filename, index);
    if (sprite) {
      context.drawImage(sprite.data, x, y);
    }
  }
}
