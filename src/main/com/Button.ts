import { atlas } from 'main/main';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { createCanvas } from 'main/utils/createCanvas';
import { DisplayFont } from 'main/com/DisplayFont';

export class Button extends DisplayObject {
  constructor(text: string) {
    super(0, 0);
    this._mouseController.subscribe('move', this.onMouseMove);
    this._mouseController.subscribe('touch', this.onTouch);
    this._mouseController.subscribe('click', this.onClick);

    const fontSize = 32;

    this.resize(this.button.normal.width, this.button.normal.height);

    this.text = createCanvas(
      this.button.normal.width,
      this.button.normal.height
    ).getContext('2d')!;
    this.text.font = new DisplayFont({ size: fontSize, weight: 700 }).font;
    this.text.fillStyle = '#100f0f';
    this.text.textAlign = 'center';
    this.text.textBaseline = 'middle';
    this.text.fillText(
      text,
      Math.floor(this.button.normal.width / 2),
      Math.floor(this.button.normal.height / 2)
    );
  }

  text: CanvasRenderingContext2D;

  button = {
    hover: atlas.getElement('buttonHover').imageData,
    pressed: atlas.getElement('buttonPressed').imageData,
    normal: atlas.getElement('buttonNormal').imageData
  };

  update(t: number) {
    if (this.shouldUpdate) {
      if (this.parent) {
        this.parent.shouldUpdate = true
      }
      this.clear();
      this.ctx.drawImage(this.button[this.state], 0, 0);
      this.ctx.drawImage(this.text.canvas, 0, 0);
      this.shouldUpdate = false;
    }
  }

  private state: 'hover' | 'pressed' | 'normal' = 'normal';

  private prevState: 'hover' | 'pressed' | 'normal' = this.state;

  private onClick = (position: Vector2) => {
    if (this.collides(position) && this.state === 'pressed') {
      console.log('Button clicked !!!');
      this.state = 'normal';
      this.shouldUpdate = true;
    }
  };

  private onTouch = (position: Vector2) => {
    if (this.collides(position)) {
      this.state = 'pressed';
      this.shouldUpdate = true;
    }
  };

  private onMouseMove = (position: Vector2) => {
    if (this.collides(position) && this.state !== 'pressed' && this.state !== 'hover') {
      this.state = 'hover';
      this.shouldUpdate = true;
      return;
    }
    if (!this.collides(position) && this.state !== 'normal') {
      this.state = 'normal';
      this.shouldUpdate = true;
      return;
    }
  };
}
