import { DisplayObject } from './DisplayObject';
import { Vector2 } from 'main/com/Vector2';
import { ContextStyle } from 'main/com/Drawer';
import { DisplayFont } from 'main/com/DisplayFont';

interface IDisplayText extends ContextStyle {
  text: string;
  wrapWidth: number;
  // font
  size: number;
  weight: number;
  linePadding: number;
  textPadding: [number] | [number, number];
}

export class DisplayText extends DisplayObject {
  constructor(private readonly props: Partial<IDisplayText>) {
    super(0, 0);
    this.InitStyle();

    const { wrapWidth } = this;

    if (wrapWidth > 0) {
      const lines = this.CalculateLines();
      this.DrawMultilineText(lines);
    }

    if (wrapWidth === 0) {
      this.DrawOneLineText();
    }
  }

  CalculateLines() {
    const { padding, text, wrapWidth } = this;
    const fitWidth = wrapWidth - padding.x * 2;
    const words = text.split(' ');
    const line = [words[0]];
    const lines: string[] = [];

    for (let i = 1; i < words.length; i++) {
      const lineString = line.join(' ');
      const nextWord = words[i];
      const { width } = this.ctx.measureText(lineString + nextWord);
      if (width > fitWidth) {
        lines.push(lineString);
        line.length = 0;
      }
      if (i === words.length - 1) {
        lines.push(nextWord);
      }
      line.push(nextWord);
    }

    return lines;
  }

  DrawMultilineText(lines: string[]) {
    const { padding, lineHeight, linePadding, wrapWidth, ctx } = this;
    this.Resize(wrapWidth, lines.length * lineHeight - linePadding + padding.y * 2);

    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    lines.forEach((line, index) => {
      ctx.fillText(line, padding.x, padding.y + index * lineHeight);
    });

    ctx.restore();
  }

  private get padding() {
    const { textPadding = [4] } = this.props;
    return new Vector2(textPadding[1] || textPadding[0], textPadding[0]);
  }

  private get linePadding() {
    const { linePadding = 0 } = this.props;
    return linePadding;
  }

  private get wrapWidth() {
    const { wrapWidth = 0 } = this.props;
    return wrapWidth;
  }

  private get text() {
    const { text = '' } = this.props;
    return text;
  }

  private get lineHeight() {
    const { displayFont, linePadding, ctx } = this;
    const { shadowBlur, shadowOffsetY } = ctx;
    const fontSize = displayFont.size;
    return fontSize + linePadding + shadowBlur + Math.abs(shadowOffsetY);
  }

  private DrawOneLineText() {
    const { padding, lineHeight, linePadding, text, ctx } = this;
    this.Resize(
      padding.x * 2 + Math.floor(ctx.measureText(text).width),
      padding.y * 2 + lineHeight - linePadding
    );
    ctx.fillText(text, ...this.GetAnchorPosition('center').xy);
  }

  private InitStyle() {
    const {
      size = 16,
      weight = 400,
      fillStyle = '#100f0f',
      shadowBlur = 2,
      shadowOffsetY = 0,
      shadowColor = '#333'
    } = this.props;

    this.displayFont = new DisplayFont(size, weight);

    this.SetContext({
      fillStyle,
      shadowBlur,
      shadowOffsetY,
      shadowColor,
      font: this.displayFont.GetFontAsString()
    });
  }
}
