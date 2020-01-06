import { ContextStyle, FillStyle } from 'main/com/ContextStyle';
import { createCanvas } from 'main/utils/createCanvas';
import { Vector2 } from 'main/com/Vector2';

export class Drawer {
  constructor(w: number, h: number) {
    this.ctx = createCanvas(w, h).getContext('2d')!;
  }

  private static _getEvenNum(value: number) {
    return value % 2 === 0 ? value : Math.floor(value / 2) * 2;
  }

  ctx: CanvasRenderingContext2D;

  private _contextStyle: ContextStyle = new ContextStyle();

  set style(contextStyle: ContextStyle) {
    Object.assign(this._contextStyle, contextStyle);
    Object.assign(this.ctx, contextStyle);
  }

  get style() {
    return this._contextStyle;
  }

  get canvas() {
    return this.ctx.canvas;
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  resize(w: number, h: number) {
    this.ctx.canvas.width = Drawer._getEvenNum(w);
    this.ctx.canvas.height = Drawer._getEvenNum(h);
    this.style = this._contextStyle;
  }

  clear(color?: FillStyle | null, ...rect: number[]) {
    const [x = 0, y = 0, w = this.width, h = this.height] = rect;
    if (color) {
      this.ctx.fillRect(x, y, w, h);
      return;
    }
    this.ctx.clearRect(x, y, w, h);
  }

  get center() {
    return new Vector2(this.width / 2, this.height / 2);
  }
}
