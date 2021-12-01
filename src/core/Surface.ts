export class Surface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(width: number = 640, height: number = 480) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fill(fillStyle: string) {
    this.context.fillStyle = fillStyle;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSpriteData(spriteData: Promise<ImageBitmap>, x: number, y: number) {
    spriteData.then((data) => {
      this.context.drawImage(data, x, y);
    });
  }
}
