import { DisplayText } from 'main/com/DisplayText';
import { mouseController, atlas } from 'main/main';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { Renderer } from 'main/com/Renderer';
import { drawRect } from 'main/utils/drawRect';

export class Button extends DisplayObject {
  constructor(
    text: string,
    fillStyle: string | CanvasGradient | CanvasPattern = '#a48a28'
  ) {
    super(0, 0);
    mouseController.on.move.subscribe(this._onMouseMove);
    mouseController.on.click.subscribe(this._onClick);
    mouseController.on.touch.subscribe(this._onTouch);

    const padding = [16, 8];

    const buttonNormalImage = atlas.getElement('buttonNormal').imageData;
    const buttonHoverImage = atlas.getElement('buttonHover').imageData;
    const buttonPressedImage = atlas.getElement('buttonPressed').imageData;

    const stateMap = {
      hover: buttonHoverImage,
      pressed: buttonPressedImage,
      normal: buttonNormalImage
    };

    this.resize(buttonNormalImage.width, buttonNormalImage.height);

    console.log('buttonNormal', buttonNormalImage);

    const textBuffer = new Renderer(0, 0);
    textBuffer.resize(
      textBuffer.ctx.measureText(text).width,
      textBuffer.fontSize
    );
    textBuffer.ctx.fillStyle = fillStyle;
    textBuffer.ctx.fillText(text, 0, 0);

    const buttonWidth = textBuffer.width + padding[0];
    const buttonHeight = textBuffer.height + padding[1];
    const textCenter = new Vector2(
      buttonWidth / 2 - textBuffer.width / 2,
      buttonHeight / 2 - textBuffer.height / 2
    );

    const borderBuffer = drawRect(buttonWidth, buttonHeight);
    const borderBufferHover = drawRect(buttonWidth, buttonHeight, {
      fillStyle: '#6a1b1a'
    });

    const displayText = new DisplayText({
      wrapWidth: 0,
      color: '#a48a28',
      text
    });
    displayText.moveTo(new Vector2(this.width / 2, this.height / 2));


    this.onUpdate = () => {
      if (this.shouldUpdate) {
        this.renderer.clear();

        this.ctx.drawImage(stateMap[this._state], 0, 0);
        this.ctx.drawImage(textBuffer.canvas, ...textCenter.xy);
        // displayText.draw(this.ctx);
        this.shouldUpdate = false;
      }
    };
  }

  private _state: 'hover' | 'pressed' | 'normal' = 'normal';

  private _onClick = (position: Vector2) => {
    if (this.collides(position) && this._state === 'pressed') {
      console.log('Button clicked !!!');
      this._state = 'hover';
      this.shouldUpdate = true;
      return;
    }
  };

  private _onTouch = (position: Vector2) => {
    if (this.collides(position)) {
      console.log('Button _onTouch !!!');
      this._state = 'pressed';
      this.shouldUpdate = true;
      return;
    }
  };

  private _onMouseMove = (position: Vector2) => {
    if (this.collides(position) && this._state !== 'pressed') {
      this._state = 'hover';
      this.shouldUpdate = true;
      return;
    }
    if (!this.collides(position)) {
      this._state = 'normal';
      this.shouldUpdate = true;
      return;
    }
  };
}
