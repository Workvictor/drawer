import { DisplayFont } from 'main/com/DisplayFont';

export class TextStyle {
  font = new DisplayFont().GetFontAsString();
  imageSmoothingEnabled = false;
  direction: CanvasDirection = 'inherit';
  textAlign: CanvasTextAlign = 'center';
  textBaseline: CanvasTextBaseline = 'middle';
  fillStyle: string | CanvasGradient | CanvasPattern = '#947c21';
  strokeStyle: string | CanvasGradient | CanvasPattern = '';
  constructor(style: Partial<TextStyle> = {}) {
    Object.assign(this, style);
  }
}
