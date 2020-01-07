export class DisplayFont {
  constructor(fontSizeInPixels?: number, weight?: number) {
    this.SetWeight(weight);
    this.SetFontSizeInPixels(fontSizeInPixels);
  }

  weight = 400;

  size = 16;

  private family: string[] = ['Arial', 'sans-serif'];

  SetFontSizeInPixels(value: number = this.size) {
    this.size = value;
  }

  SetWeight(value: number = this.weight) {
    this.weight = value;
  }

  GetFontAsString() {
    return [this.weight, `${this.size}px`, this.family.join(', ')].join(' ');
  }
}
