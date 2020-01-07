import { Scene } from 'main/com/Scene';
import { scenes } from 'main/scenes';
import { Drawer } from 'main/com/Drawer';

export type Scenes = 'loading' | 'menu' | 'options' | 'game';

export class SceneController {
  constructor(root: HTMLElement = document.body) {
    this.drawer = new Drawer(window.innerWidth, window.innerHeight);
    this.root = root;

    // TODO load scene as ES6 module
    scenes.forEach(IScene => {
      const scene = new IScene(this.drawer.width, this.drawer.height);
      this.scenes.push(scene);
    });

    this.scene = this.scenes[0];
  }

  private drawer: Drawer;

  private scenes: Scene[] = [];

  private scene: Scene;

  private isRunning = false;

  private rafID = 0;

  set activeScene(scene: Scenes) {
    this.scene.unload();
    this.scene =
      this.scenes.find(item => item.name === scene) || this.scene;
    this.scene.load();
  }

  loadScene = () => {
    // TODO load scene as ES6 module
  };

  set root(root: HTMLElement) {
    this.drawer.ctx.canvas.classList.add('renderer');
    root.appendChild(this.drawer.ctx.canvas);
    const resize = () => {
      this.drawer.Resize(window.innerWidth, window.innerHeight);
      this.scene.Resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
  }

  start = () => {
    this.isRunning = true;
    this.update();
  };

  stop = () => {
    this.isRunning = false;
  };

  update = (t: number = 0) => {
    if (this.scenes.length > 0) {
      this.scene.update(t);
      if (this.scene.shouldUpdate) {
        this.scene.draw(this.drawer.ctx);
      }
    }
    if (this.isRunning) {
      this.rafID = window.requestAnimationFrame(this.update);
    } else {
      window.cancelAnimationFrame(this.rafID);
    }
  };
}
