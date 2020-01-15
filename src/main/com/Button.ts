import { atlas } from 'main/main';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { ContextStyle, Drawer } from 'main/com/Drawer';
import { DisplayFont } from 'main/com/DisplayFont';

export class Button extends DisplayObject {
  constructor(text: string) {
    super(0, 0);
    this._mouseController.subscribe('move', this.onMouseMove);
    this._mouseController.subscribe('touch', this.onTouch);
    this._mouseController.subscribe('click', this._onClick);

    this.displayFont = new DisplayFont(32, 700);

    const style: Partial<ContextStyle> = {
      font: this.displayFont.GetFontAsString(),
      fillStyle: '#333',
      shadowBlur: 1,
      shadowOffsetY: 1,
      shadowColor: '#fff',
    };

    const { width, height } = this.button.normal;

    this.Resize(width, height);

    const textPosition = this.GetAnchorPosition('center').xy;

    const textNormal = new Drawer(this.width, this.height);
    textNormal.SetContext(style);
    textNormal.ctx.fillText(text, ...textPosition);

    const textPressed = new Drawer(this.width, this.height);
    textPressed.SetContext(style);
    textPressed.ctx.fillText(text, textPosition[0], textPosition[1] + 5);

    this.textMap = {
      normal: textNormal.canvas,
      hover: textNormal.canvas,
      pressed: textPressed.canvas
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
      this.collides(position) && this.state === 'normal'
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
