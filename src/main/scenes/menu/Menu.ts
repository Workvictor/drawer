import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { Title } from 'main/com/Title';
import { Button } from 'main/com/Button';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Menu extends Scene {
  constructor(w: number, h: number) {
    super('menu', w, h);
  }

  init = () => {
    const container = new DisplayObject(320, 480);
    const margin = 16;
    const centerX = container.width / 2;

    const frame = new Frame(container.width, container.height);
    const title = new Title(text.mainMenu, new Vector2(centerX, margin));
    const button = new Button(text.newGame);
    button.moveTo(new Vector2(centerX, title.bottom.y + margin));

    container.addChild(frame, title, button);
    container.resize = (w, h) => {
      container.moveTo(new Vector2(w / 2, h / 2));
    };
    container.resize(this.width, this.height);

    // TODO should subscribe on resize event
    this.resize = (w, h) => {
      this.renderer.resize(w, h);
      container.resize(this.width, this.height);
    };

    this.update = t => {
      if (container.shouldUpdate) {
        container.onUpdate(t);
      }
    };

    this.draw = ctx => {
      container.draw(this.renderer.ctx);
      ctx.drawImage(this.renderer.canvas, 0, 0);
    };
  }
}
