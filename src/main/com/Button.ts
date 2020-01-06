import { atlas } from 'main/main';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { DisplayFont } from 'main/com/DisplayFont';
import { Drawer } from 'main/com/Drawer';
import { ContextStyle } from 'main/com/ContextStyle';

export class Button extends DisplayObject {
  constructor(text: string) {
    super(0, 0);
    this._mouseController.subscribe('move', this.onMouseMove);
    this._mouseController.subscribe('touch', this.onTouch);
    this._mouseController.subscribe('click', this._onClick);

    const fontSize = 32;
    const textStyle = new ContextStyle({
      fillStyle: '#100f0f'
    });
    textStyle.displayFont = new DisplayFont({size: fontSize, weight: 700});

    const { width, height } = this.button.normal;

    this.resize(width, height);

    const textPosition = this.center.xy;

    const textNormal = new Drawer(this.width, this.height);
    textNormal.style = textStyle;
    textNormal.ctx.fillText(text, ...textPosition);

    const textPressed = new Drawer(this.width, this.height);
    textPressed.style = textStyle;
    textPressed.ctx.fillText(text, textPosition[0], textPosition[1] + 5);

    this.textMap = {
      normal: textNormal.canvas,
      hover: textNormal.canvas,
      pressed: textPressed.canvas,
    };
  }

  textMap: {
    normal: HTMLCanvasElement;
    pressed: HTMLCanvasElement;
    hover: HTMLCanvasElement;
  };

  button = {
    hover: atlas.getElement('buttonHover').imageData,
    pressed: atlas.getElement('buttonPressed').imageData,
    normal: atlas.getElement('buttonNormal').imageData
  };

  update(t: number) {
    if (this.shouldUpdate) {
      this.clear();
      this.ctx.drawImage(this.button[this.state], 0, 0);
      this.ctx.drawImage(this.textMap[this.state], 0, 0);
      this.shouldUpdate = false;
    }
  }

  private state: 'hover' | 'pressed' | 'normal' = 'normal';

  onClick() {}

  private _onClick = (position: Vector2) => {
    if (this.collides(position) && this.state === 'pressed') {
      this.state = 'normal';
      this.shouldUpdate = true;
      this.onClick();
    }
  };

  private onTouch = (position: Vector2) => {
    if (this.collides(position)) {
      this.state = 'pressed';
      this.shouldUpdate = true;
    }
  };

  private onMouseMove = (position: Vector2) => {
    if (
      this.collides(position) &&
      this.state !== 'pressed' &&
      this.state !== 'hover'
    ) {
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
