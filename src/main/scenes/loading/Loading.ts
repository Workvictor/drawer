import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { Title } from 'main/com/Title';
import { Button } from 'main/com/Button';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Loading extends Scene {
  constructor(w: number, h: number) {
    super('loading', w, h);
    const container = new DisplayObject(320, 180);
    const margin = 16;
    const centerX = container.width / 2;

    const frame = new Frame(container.width, container.height);
    const title = new Title(text.loading, new Vector2(centerX, margin));

    container.addChild(frame, title);
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
