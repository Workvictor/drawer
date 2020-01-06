import { Scenes } from 'main/SceneController';
import { Drawer } from 'main/com/Drawer';
import { DisplayObject } from 'main/com/DisplayObject';

export class Scene extends Drawer {
  constructor(name: Scenes, w: number, h: number) {
    super(w, h);
    this.name = name;
  }

  // container: DisplayObject;

  shouldUpdate = true;

  protected loaded: boolean = false;

  name: Scenes;

  init() {}

  onLoad() {
    this.loaded = true;
  }

  update(t: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvas, 0, 0);
    console.log('Scene draw');
    this.shouldUpdate = false;
  }
}
