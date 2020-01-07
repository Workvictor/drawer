import { createCanvas } from 'main/utils/createCanvas';
import { Vector2 } from 'main/com/Vector2';
import { DisplayFont } from 'main/com/DisplayFont';

export class Drawer {
  constructor(w: number, h: number) {
    this.ctx = createCanvas(w, h).getContext('2d')!;
    this.SetContext();
  }

  private static _getEvenNum(value: number) {
    return value % 2 === 0 ? value : Math.floor(value / 2) * 2;
  }

  displayFont = new DisplayFont();

  private defaultContextState: ContextStyle = {
    textAlign: 'center',
    imageSmoothingQuality: 'low',
    imageSmoothingEnabled: false,
    shadowColor: '#111',
    fillStyle: '#d8e3b4',
    textBaseline: 'middle',
    shadowBlur: 0,
    shadowOffsetY: 0,
    font: this.displayFont.GetFontAsString()
  };

  SetContext(options: Partial<ContextStyle> = this.defaultContextState) {
    this.defaultContextState = { ...this.defaultContextState, ...options };
    const {
      textAlign,
      imageSmoothingQuality,
      imageSmoothingEnabled,
      shadowColor,
      fillStyle,
      textBaseline,
      shadowBlur,
      shadowOffsetY,
      font
    } = this.defaultContextState;
    this.ctx.font = font;
    this.ctx.textBaseline = textBaseline;
    this.ctx.textAlign = textAlign;
    this.ctx.imageSmoothingEnabled = imageSmoothingEnabled;
    this.ctx.imageSmoothingQuality = imageSmoothingQuality;
    this.ctx.fillStyle = fillStyle;
    this.ctx.shadowColor = shadowColor;
    this.ctx.shadowBlur = shadowBlur;
    this.ctx.shadowOffsetY = shadowOffsetY;
  }

  ctx: CanvasRenderingContext2D;

  get canvas() {
    return this.ctx.canvas;
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  Resize(w: number, h: number) {
    // !! it will reset ctx to default
    this.ctx.canvas.width = Drawer._getEvenNum(w);
    this.ctx.canvas.height = Drawer._getEvenNum(h);
    this.SetContext();
  }

  clear(color?: FillStyle | null, ...rect: number[]) {
    const [x = 0, y = 0, w = this.width, h = this.height] = rect;
    if (color) {
      this.ctx.fillRect(x, y, w, h);
      return;
    }
    this.ctx.clearRect(x, y, w, h);
  }

  GetAnchorPosition(at: 'center' | 'top-center' | 'bottom-center'){
    switch (at) {
      case 'center':
        return new Vector2(this.width / 2, this.height / 2);
      case 'top-center':
        return new Vector2(this.width / 2, 0);
      case 'bottom-center':
        return new Vector2(this.width / 2, this.height);
    }
  }
}

type FillStyle = string | CanvasGradient | CanvasPattern;

export interface ContextStyle {
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: ImageSmoothingQuality;
  fillStyle: FillStyle;
  shadowColor: string;
  font: string;
  shadowBlur: number;
  shadowOffsetY: number;
}
