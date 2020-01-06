import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { Title } from 'main/com/Title';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Loading extends Scene {
  constructor(w: number, h: number) {
    super('loading', w, h);
    this.container = new DisplayObject(320, 180);
    const margin = 16;
    const centerX = this.container.width / 2;

    const frame = new Frame(this.container.width, this.container.height);
    const title = new Title(text.loading, new Vector2(centerX, margin));

    this.container.add(frame, title);
    this.container.moveTo(this.center);

    this.update = t => {
      if (this.container.shouldUpdate) {
        this.container.update(t);
      }
    };

    this.draw = ctx => {
      this.container.draw(this.ctx);
      ctx.drawImage(this.canvas, 0, 0);
    };
  }

  container: DisplayObject;

  onResize = () => {
    this.container.moveTo(this.center);
  };
}
