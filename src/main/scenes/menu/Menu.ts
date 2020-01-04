import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { DisplayText } from 'main/com/DisplayText';
import { Title } from 'main/scenes/menu/Title';
import { Button } from 'main/scenes/menu/Button';

export class Menu extends Scene {
  constructor(w: number, h: number) {
    super('menu', w, h);
    const menu = new DisplayObject(320, 480);
    menu.renderer.ctx.fillRect(0, 0, menu.width, menu.height);
    menu.renderer.ctx.strokeStyle = 'rgba(111,17,22,0.85)';
    menu.renderer.ctx.fillStyle = 'rgba(35,35,35,0.85)';
    menu.renderer.ctx.fillRect(2, 2, menu.width - 4, menu.height - 4);

    const title = new Title();
    title.moveTo(new Vector2(menu.width / 2, 16));
    menu.addChild(title);
    // title.draw(menu.renderer.ctx);

    const button = new Button();
    button.moveTo(new Vector2(menu.width / 2, title.position.y + title.height));
    menu.addChild(button);
    // button.draw(menu.renderer.ctx);

    menu.onResize = (w, h) => {
      // this.renderer.clear();
      menu.moveTo(new Vector2(w / 2, h / 2));
      menu.draw(this.renderer.ctx);
    };
    menu.onResize(this.width, this.height);

    this.onResize = (w, h) => {
      this.width = w;
      this.height = h;
      this.renderer.resize(w, h);
      menu.onResize(w, h);
    };

    this.onLoad = () => {
      console.log('loaded scene', this.name);
    };

    // const onClick = (e: MouseEvent) => {
    //   console.log(e.clientX, e.clientY);
    //   console.log('title', title.globalPosition);
    //   console.log('menu', menu.globalPosition);
    // };
    //
    // window.addEventListener('click', onClick);
  }
}
