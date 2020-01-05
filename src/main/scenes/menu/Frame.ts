import { DisplayObject } from 'main/com/DisplayObject';
import { Vector2 } from 'main/com/Vector2';

export class Frame extends DisplayObject {
  constructor(w: number, h: number) {
    super(w, h);
    this.ctx.fillStyle = 'rgb(35,50,64)';
    this.ctx.strokeStyle = 'rgb(91,122,148)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeRect(0, 0, this.width, this.height);
    this.moveTo(new Vector2(this.width / 2, this.height / 2));
  }
}
