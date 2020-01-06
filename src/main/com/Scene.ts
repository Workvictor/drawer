import { Scenes } from 'main/SceneController';
import { Drawer } from 'main/com/Drawer';
import { DisplayObject } from 'main/com/DisplayObject';

export class Scene extends Drawer {
  constructor(w: number, h: number) {
    super(w, h);
    this.container = new DisplayObject(w, h);
    this.container.moveTo(this.center);
    this.init();
  }

  protected container: DisplayObject;

  shouldUpdate = true;

  loaded: boolean = false;

  name?: Scenes;

  resize(w: number, h: number) {
    super.resize(w, h);
    this.container.moveTo(this.center);
  }

  init() {}

  load() {
    this.loaded = true;
  }

  unload() {
    this.loaded = false;
    this.container.clear();
  }

  update(t: number) {
    if (this.container.shouldUpdate) {
      this.shouldUpdate = true;
      this.container.update(t);
      this.container.draw(this.ctx);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.container.draw(ctx);
    this.shouldUpdate = false;
  }
}
