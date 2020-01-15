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

  private deltaTime = Date.now();

  set activeScene(scene: Scenes) {
    this.scene.unload();
    this.scene = this.scenes.find(item => item.name === scene) || this.scene;
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
    this.deltaTime = Date.now();
    this.update();
  };

  stop = () => {
    this.isRunning = false;
  };

  update = () => {
      window.cancelAnimationFrame(this.rafID);

    if (!this.scene) {
      return
    }

    this.deltaTime = Date.now() - this.deltaTime;

    console.log('deltaTime', this.deltaTime)

    this.scene.update(this.deltaTime);
    if (this.scene.shouldUpdate) {
      this.scene.draw(this.drawer.ctx);
    }

    if (this.isRunning) {
      this.rafID = window.requestAnimationFrame(this.update);
    }
  };
}
