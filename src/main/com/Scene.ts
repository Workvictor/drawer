import { Scenes } from 'main/SceneController';
import { Renderer } from './Renderer';

export class Scene {
  constructor(name: Scenes, w: number, h: number) {
    this.width = w;
    this.height = h;
    this.name = name;
    this.renderer = new Renderer(w, h);
  }

  renderer: Renderer;

  name: Scenes;

  width: number;

  height: number;

  onLoad = () => {};

  onResize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
    this.renderer.resize(w, h);
  };

  onUpdate = (t: number) => {};

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(this.renderer.canvas, 0, 0);
  };
}
