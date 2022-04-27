const placeholder = createImageBitmap(new ImageData(16, 16));

const spriteSheets = [
  {
    id: 'map1',
    src: 'assets/iso-64x64-building.png',
    spriteWidth: 64,
    spriteHeight: 64,
  },
];

type Sheet = {
  id: string;
};

class SpriteStore {
  sheets: Sheet[];

  spriteSheetImages: {
    src: string;
    img: HTMLImageElement;
  }[] = [];

  spriteDatas: {
    id: string;
    data: Promise<ImageBitmap>;
  }[] = [];

  getData(id: string, index: number) {
    const sheetPreset = spriteSheets.find((spriteSheet) => {
      return spriteSheet.id === id;
    });

    if (!sheetPreset) {
      throw new Error(`Unknown spritesheet ${id}!`);
    }

    const data = this.spriteDatas.find((d) => {
      return d.id === `${id}_${index}`;
    });

    if (data) {
      return data.data;
    }

    return this.getSpriteSheetImage(sheetPreset.src)
      .then((image) => {
        const spriteCountH = image.width / sheetPreset.spriteWidth;

        const x = index % spriteCountH;
        const y = ~~(index / spriteCountH);

        const dx = createImageBitmap(
          image,
          x * sheetPreset.spriteWidth,
          y * sheetPreset.spriteHeight,
          sheetPreset.spriteWidth,
          sheetPreset.spriteHeight,
        );

        this.spriteDatas.push({
          id: `${id}_${index}`,
          data: dx,
        });

        return dx;
      });
  }

  getSpriteSheetImage(src: string) {
    return new Promise((resolve: (value: HTMLImageElement) => void) => {
      const p = this.spriteSheetImages.find((s) => {
        return s.src === src;
      });

      if (p) resolve(p.img);
      else return this.loadSpriteSheetImage(src);
    });
  }

  loadSpriteSheetImage(src: string) {
    const image = new Image();
    image.src = src;
    return new Promise((resolve: (value: HTMLImageElement) => void) => {
      image.onload = () => {
        this.spriteSheetImages.push({
          src,
          img: image,
        });
        resolve(image);
      };
    });
  }
}

const store = new SpriteStore();

export class Sprite {
  data: Promise<ImageBitmap> = placeholder;

  constructor(id: string, index: number) {
    this.data = store.getData(id, index);
  }
}
