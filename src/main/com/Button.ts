import { DisplayText } from 'main/com/DisplayText';
import { mouseController } from 'main/main';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';

export class Button extends DisplayObject {
  constructor(text: string) {
    super(0, 0);
    const padding = [16, 8];
    const displayText = new DisplayText({
      wrapWidth: 0,
      text
    });
    this.resize(displayText.width + padding[0], displayText.height + padding[1]);
    displayText.moveTo(new Vector2(this.width / 2, this.height / 2));

    mouseController.on.move.subscribe(this.onMouseMove);
    mouseController.on.click.subscribe(this.onClick);

    this.onUpdate = () => {
      if (this.shouldUpdate) {
        this.renderer.clear();
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.strokeRect(0, 0, this.width, this.height);
        displayText.draw(this.ctx);
        this.shouldUpdate = false;
      }
    };
  }

  private _isHover = false;

  get strokeStyle() {
    return this._isHover ? '#6a0d1a' : '#6a5b28';
  }

  set hover(state: boolean) {
    this._isHover = state;
  }

  onClick = (position: Vector2) => {
    if (this.collides(position)) {
      console.log('Button clicked !!!');
    }
  };

  onMouseMove = (position: Vector2) => {
    if (this.collides(position) && !this._isHover) {
      this._isHover = true;
      this.shouldUpdate = true;
      return;
    }
    if (!this.collides(position) && this._isHover) {
      this._isHover = false;
      this.shouldUpdate = true;
      return;
    }
  };
}
