import { DisplayFont } from 'main/com/DisplayFont';

export class TextStyle {
  font = new DisplayFont().font;
  wrapWidth?: number;
  // imageSmoothingEnabled = false;
  direction: CanvasDirection = 'inherit';
  textAlign: CanvasTextAlign = 'left';
  textBaseline: CanvasTextBaseline = 'top';
  fillStyle: string | CanvasGradient | CanvasPattern = '#b9b793';
  strokeStyle: string | CanvasGradient | CanvasPattern = '';
  constructor(style: Partial<TextStyle> = {}) {
    Object.assign(this, style);
  }
}
