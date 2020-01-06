export class DisplayFont {
  constructor(style?: Partial<DisplayFont>) {
    if (style) {
      Object.assign(this, style);
    }
  }
  weight = 400;

  size = 16;

  private family: string[] = ['Arial', 'sans-serif'];

  get font() {
    return [this.weight, `${this.size}px`, this.family.join(', ')].join(' ');
  }
}
