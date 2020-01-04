import { DisplayObject } from './DisplayObject';

interface IDisplayText {
  text: string;
  wrapWidth: number;
  fontSize?: number;
  linePadding?: number;
  textPadding?: number;
  color?: string | CanvasGradient | CanvasPattern,
}

export class DisplayText extends DisplayObject {
  constructor(props: IDisplayText) {
    super(0, 0);
    this.init(props);
  }

  init = (props: IDisplayText) => {
    const {
      text,
      fontSize = this.renderer.fontSize,
      linePadding = 4,
      textPadding = 4,
      color = this.renderer.ctx.fillStyle,
      wrapWidth
    } = props;

    this.renderer.ctx.fillStyle = color;

    // one line text
    if (wrapWidth === 0) {
      this.renderer.resize(
        textPadding * 2 + this.renderer.ctx.measureText(text).width,
        textPadding * 2 + fontSize
      );
      this.onResize(this.renderer.width, this.renderer.height);
      this.renderer.ctx.fillText(text, textPadding, textPadding);
      return;
    }

    const lineHeight = linePadding + fontSize;

    let i = 0;
    let words = text.split(' ');
    let line: string[] = [];
    let lines: string[] = [];

    while (i <= words.length) {
      line.push(words[i]);

      const { width } = this.renderer.ctx.measureText(line.join(' '));

      if (width > wrapWidth) {
        i--;
        lines.push(line.slice(0, -1).join(' '));
        line = [];
      }
      if (i === words.length) {
        lines.push(line.slice(0, -1).join(' '));
      }
      i++;
    }


    this.renderer.resize(wrapWidth, lines.length * lineHeight - linePadding);
    this.onResize(this.renderer.width, this.renderer.height);
    lines.forEach((line, index) => {
      this.renderer.ctx.fillText(line, textPadding, textPadding + index * lineHeight);
    });

  };
}
