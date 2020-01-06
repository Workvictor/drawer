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
    this.container = new DisplayObject(320, 480);
    this.container.moveTo(this.center);
  }

  container: DisplayObject;

  resize(w: number, h: number) {
    super.resize(w, h);
    this.container.moveTo(this.center);
  }

  update(t: number) {
    if (this.container.shouldUpdate) {
      this.container.update(t);
      this.shouldUpdate = true;
      this.container.draw(this.ctx);
    }
  }

  init() {
    super.init();
    const margin = 16;
    const centerX = this.container.center.x;

    const frame = new Frame(this.container.width, this.container.height);
    const title = new Title(text.mainMenu, new Vector2(centerX, margin));
    const button = new Button(text.newGame);
    button.moveTo(new Vector2(centerX, title.bottom.y + margin));

    this.container.add(frame, title, button);
  }
}
