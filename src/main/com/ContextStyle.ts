import { DisplayFont } from 'main/com/DisplayFont';

export class ContextStyle implements IContextStyle {
  constructor(options?: Partial<ContextStyle>) {
    if (options) {
      Object.assign(this, options);
    }
  }

  private _displayFont: DisplayFont = new DisplayFont();

  shadowOffsetY = 0;

  shadowOffsetX = 0;

  shadowColor = '#000';

  shadowBlur = 0;

  lineWidth = 2;

  imageSmoothingEnabled = false;

  globalCompositeOperation = 'source-over';

  imageSmoothingQuality: ImageSmoothingQuality = 'low';

  font = this._displayFont.font;

  textAlign: CanvasTextAlign = 'center';

  textBaseline: CanvasTextBaseline = 'middle';

  fillStyle: FillStyle = '#bfbfbf';

  strokeStyle: FillStyle = '#a48a28';

  set displayFont(font: DisplayFont) {
    this._displayFont = font;
    this.font = this._displayFont.font;
  }

  get fontSize() {
    return this._displayFont.size;
  }

  get lineHeight() {
    return this._displayFont.size + this.shadowBlur + this.lineWidth
  }
}

export type FillStyle = string | CanvasGradient | CanvasPattern;

type IContextStyle = Pick<
  CanvasRenderingContext2D,
  | 'textBaseline'
  | 'textAlign'
  | 'font'
  | 'fillStyle'
  | 'strokeStyle'
  | 'imageSmoothingQuality'
  | 'globalCompositeOperation'
  | 'imageSmoothingEnabled'
  | 'lineWidth'
  | 'shadowBlur'
  | 'shadowColor'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
>;
