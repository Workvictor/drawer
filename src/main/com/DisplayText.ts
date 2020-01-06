import { DisplayObject } from './DisplayObject';

interface IDisplayText {
  text: string;
  wrapWidth: number;
  fontSize?: number;
  linePadding?: number;
  textPadding?: [number] | [number, number];
  color?: string | CanvasGradient | CanvasPattern;
}

export class DisplayText extends DisplayObject {
  constructor(props: IDisplayText) {
    super(0, 0);
    this.init(props);
  }

  init = (props: IDisplayText) => {
    const {
      text,
      fontSize = this.style.fontSize,
      linePadding = 0,
      textPadding = [0],
      color = this.ctx.fillStyle,
      wrapWidth
    } = props;

    this.ctx.fillStyle = color;

    // one line text
    if (wrapWidth === 0) {
      this.resize(
        textPadding[0] * 2 + Math.floor(this.ctx.measureText(text).width),
        (textPadding[1] || textPadding[0]) * 2 + fontSize
      );
      this.ctx.fillText(text, textPadding[0], textPadding[1] || textPadding[0]);
      return;
    }

    const lineHeight = linePadding + fontSize;

    let i = 0;
    let words = text.split(' ');
    let line: string[] = [];
    let lines: string[] = [];

    while (i <= words.length) {
      line.push(words[i]);

      const { width } = this.ctx.measureText(line.join(' '));

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

    this.resize(wrapWidth, lines.length * lineHeight - linePadding);
    lines.forEach((line, index) => {
      this.ctx.fillText(
        line,
        textPadding[0],
        textPadding[1] || textPadding[0] + index * lineHeight
      );
    });
  };
}
