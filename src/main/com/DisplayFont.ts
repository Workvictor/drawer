export class DisplayFont {
  private style = 'normal';
  private variant = 'normal';
  private weight = 400;
  private stretch = 'normal';
  size: number = 16;
  lineHeight: number = 1;
  family: string[] = ['Arial', 'sans-serif'];

  linePadding: number = 4;
  static PX(value: number) {
    return `${value}px`;
  }

  readonly font: string;

  constructor(style: Partial<DisplayFont> = {}) {
    Object.assign(this, style);
    this.font = [
      this.style,
      this.variant,
      this.weight,
      this.stretch,
      `${DisplayFont.PX(this.size)} / ${this.lineHeight}`,
      this.family
    ].join(' ');
  }

  get height() {
    return this.size * this.lineHeight;
  }

  parse = (fontLiteral: string) => {
    const [
      style,
      variant,
      weight,
      stretch,
      ...[size, _, lineHeight, ...family]
    ] = fontLiteral.split(' ');
    return {
      style,
      variant,
      weight,
      stretch,
      size,
      lineHeight,
      family: family.join(' ')
    };
  };
}
