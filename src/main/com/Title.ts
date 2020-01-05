import { DisplayText } from 'main/com/DisplayText';
import { Vector2 } from 'main/com/Vector2';

export class Title extends DisplayText {
  constructor(text:string, position: Vector2) {
    super({
      wrapWidth: 0,
      text
    });
    this.moveTo(position);
  }
}
