import { createCanvas } from 'main/utils/createCanvas';
import { TextStyle } from 'main/com/TextStyle';
import { DisplayFont } from 'main/com/DisplayFont';

export class Renderer {
  constructor(
    width = window.innerWidth,
    height = window.innerHeight,
    textStyle: TextStyle = Renderer.global.textStyle,
    displayFont: DisplayFont = Renderer.global.displayFont
  ) {
    this.ctx = this.createContext(width, height, textStyle);
    this._textStyle = textStyle;
    this._displayFont = displayFont;
  }

  static global = {
    textStyle: new TextStyle(),
    displayFont: new DisplayFont()
  };

  public ctx: CanvasRenderingContext2D;

  protected _textStyle: TextStyle = Renderer.global.textStyle;

  protected _displayFont: DisplayFont = Renderer.global.displayFont;

  protected _aspectRatio = 16 / 9;

  get fontSize() {
    return this._displayFont.size;
  }

  debug = (color = '#4ae338') => {
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(0, 0, this.width, this.height);
    return this;
  };

  resize = (width: number, height: number) => {
    Object.assign(this.canvas, {
      width: Math.floor(width / 2) * 2,
      height: Math.floor(height / 2) * 2
    });
    this.restoreStyle();
  };

  setDisplayStyles = ({
    textStyle = this._textStyle,
    displayFont = this._displayFont
  }) => {
    this._textStyle = textStyle;
    this._displayFont = displayFont;
    this.restoreStyle();
  };

  restoreStyle = () => {
    Object.assign(this.ctx, this._textStyle);
  };

  createContext = (
    width = this.width,
    height = this.height,
    textStyle: TextStyle = this._textStyle
  ) => {
    const ctx = createCanvas(width, height).getContext(
      '2d'
    )!;
    Object.assign(ctx, textStyle);
    return ctx;
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  get canvas() {
    return this.ctx.canvas;
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }
}
