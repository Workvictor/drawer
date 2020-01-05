import { Renderer } from 'main/com/Renderer';
import { Scene } from 'main/com/Scene';
import { scenes } from 'main/scenes';

export type Scenes = 'loading' | 'menu' | 'options' | 'game';

export class SceneController {
  constructor(renderer: Renderer, root: HTMLElement = document.body) {
    this._renderer = renderer;
    this.initRenderer(root);

    // TODO load scene as ES6 module
    scenes.forEach(IScene => {
      this._scenes.push(
        new IScene(this._renderer.width, this._renderer.height)
      );
    });
  }

  private _renderer: Renderer;

  private _scenes: Scene[] = [];

  private _scene?: Scene;

  private _isRunning = false;

  private _rafID = 0;

  private _activeScene?: Scenes;

  set activeScene(scene: Scenes) {
    this._activeScene = scene;
    this._scene = this._scenes.find(item => item.name === this._activeScene);
    if (this._scene) {
      this._scene.onLoad();
      this._scene.init();
    }
  }

  loadScene = () => {
    // TODO load scene as ES6 module
  };

  initRenderer = (root: HTMLElement) => {
    this._renderer.ctx.canvas.classList.add('renderer');
    root.appendChild(this._renderer.ctx.canvas);
    const resize = () => {
      this._renderer.resize(window.innerWidth, window.innerHeight);
      this._scenes.forEach(scene => {
        scene.resize(window.innerWidth, window.innerHeight);
      });
    };
    window.addEventListener('resize', resize);
  };

  start = () => {
    this._isRunning = true;
    this.update();
  };

  stop = () => {
    this._isRunning = false;
  };

  update = (t?: number) => {
    if (this._scene && t) {
      this._scene.update(t);
      this._scene.draw(this._renderer.ctx);
    }
    if (this._isRunning) {
      this._rafID = window.requestAnimationFrame(this.update);
    } else {
      window.cancelAnimationFrame(this._rafID);
    }
  };
}
