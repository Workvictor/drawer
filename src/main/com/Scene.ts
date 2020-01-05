import { Scenes } from 'main/SceneController';
import { Renderer } from './Renderer';

export class Scene {
  constructor(name: Scenes, w: number, h: number) {
    this.name = name;
    this.renderer = new Renderer(w, h);
  }

  protected renderer: Renderer;

  protected loaded: boolean = false;

  name: Scenes;

  get width() {
    return this.renderer.width;
  }

  get height() {
    return this.renderer.height;
  }

  init = () => {};

  onLoad = () => {
    this.loaded = true;
  };

  resize = (w: number, h: number) => {
    this.renderer.resize(w, h);
  };

  update = (t: number) => {};

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(this.renderer.canvas, 0, 0);
  };
}
