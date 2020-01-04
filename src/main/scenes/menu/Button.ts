import { DisplayText } from 'main/com/DisplayText';

export class Button extends DisplayText {
  constructor() {
    super({
      textPadding: 16,
      wrapWidth: 0,
      text: 'New Game'
    });
    this.renderer.ctx.strokeStyle = '#6a5b28';
    this.renderer.ctx.strokeRect(0, 0, this.width, this.height);

    this.clickable = true;
    this.onClick = () => {
      console.log('Button clicked !!!');
    };
  }
}
