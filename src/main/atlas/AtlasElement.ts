import { createCanvas } from 'main/utils/createCanvas';

export class AtlasElement {
  constructor(id: string, ...frame: [number, number, number, number]) {
    this.id = id;
    this.sx = Number(frame[0]);
    this.sy = Number(frame[1]);
    this.width = Number(frame[2]);
    this.height = Number(frame[3]);
    this._buffer = createCanvas(this.width, this.height).getContext('2d')!;
  }

  id: string;

  sx: number;

  sy: number;

  width: number;

  height: number;

  private _buffer: CanvasRenderingContext2D;

  get imageData() {
    return this._buffer.canvas;
  }

  set dataSource(image: HTMLImageElement) {
    if (image && image instanceof HTMLImageElement) {
      this._buffer.drawImage(
        image,
        this.sx,
        this.sy,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    }
  }
}
