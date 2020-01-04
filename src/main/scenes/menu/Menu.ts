import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { DisplayObject } from 'main/com/DisplayObject';
import { Title } from 'main/scenes/menu/Title';
import { Button } from 'main/com/Button';

export class Menu extends Scene {
  constructor(w: number, h: number) {
    super('menu', w, h);
    const wrapper = new DisplayObject(320, 480);

    const menu = new DisplayObject(wrapper.width, wrapper.height);
    menu.ctx.fillStyle = 'rgb(35,50,64)';
    menu.ctx.strokeStyle = 'rgb(91,122,148)';
    menu.ctx.fillRect(0, 0, menu.width, menu.height);
    menu.ctx.strokeRect(0, 0, menu.width, menu.height);
    menu.moveTo(new Vector2(wrapper.width / 2, wrapper.height / 2));
    wrapper.addChild(menu);

    const title = new Title();
    title.moveTo(new Vector2(menu.width / 2, 16));
    wrapper.addChild(title);

    const button = new Button('New Game');
    button.moveTo(
      new Vector2(
        wrapper.width / 2,
        title.position.y + title.height + button.height / 2
      )
    );
    wrapper.addChild(button);

    wrapper.resize = (w, h) => {
      wrapper.moveTo(new Vector2(w / 2, h / 2));
    };
    wrapper.resize(this.width, this.height);

    // TODO should subscribe on resize event
    this.resize = (w, h) => {
      this.renderer.resize(w, h);
      wrapper.resize(this.width, this.height);
    };

    this.update = t => {
      if (wrapper.shouldUpdate) {
        wrapper.onUpdate(t)
      }
    };

    this.draw = ctx => {
      wrapper.draw(this.renderer.ctx);
      ctx.drawImage(this.renderer.canvas, 0, 0);
    };

    this.onLoad = () => {
      console.log('loaded scene', this.name);
    };
  }
}
