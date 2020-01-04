import { DisplayText } from 'main/com/DisplayText';

export class Title extends DisplayText {
  constructor() {
    super({
      wrapWidth: 0,
      text: 'Main menu'
    });

    this.clickable = true;
    this.onClick = () => {
      console.log('Title clicked !!!');
    };
  }
}
