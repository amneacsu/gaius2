import { System } from '../ecs';

const spriteSheets = [
  {
    name: 'sample1',
    filename: 'iso-64x64-building.png',
    width: 64,
    height: 64,
  },
];

type SpriteSheet = {
  filename: string;
  width: number;
  height: number;
};

type Sprite = {
  filename: string;
  index: number;
  data: ImageBitmap;
};

export class SpriteSystem extends System {
  sprites: Sprite[] = [];

  loadSpriteSheet(spriteSheet: SpriteSheet) {
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
  }

  init() {
    spriteSheets.forEach((spriteSheet) => this.loadSpriteSheet(spriteSheet));
  }

  execute() {

  }

  getSpriteData(filename: string, index: number) {
    const sprite = this.sprites.find((sprite) => {
      return sprite.filename === filename && sprite.index === index;
    });

    return sprite?.data;
  }
}
