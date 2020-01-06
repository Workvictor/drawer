import { ContextStyle, FillStyle } from 'main/com/ContextStyle';
import { createCanvas } from 'main/utils/createCanvas';
import { Vector2 } from 'main/com/Vector2';

export class Drawer {
  constructor(w: number, h: number) {
    this.ctx = createCanvas(w, h).getContext('2d')!;
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

  debug(color = '#4ae338') {
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  private _getEvenNum(value: number) {
    return value % 2 === 0 ? value : Math.floor(value / 2) * 2;
  }

  resize(w: number, h: number) {
    this.ctx.canvas.width = this._getEvenNum(w);
    this.ctx.canvas.height = this._getEvenNum(h);
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
