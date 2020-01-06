import './index.css';

import { SceneController } from 'main/SceneController';
import { MouseController } from 'main/com/MouseController';
import { Atlas } from 'main/atlas/Atlas';

const mouseController = new MouseController();

const atlas = new Atlas();

export { mouseController, atlas };

export function main() {
  const root = document.getElementById('root')!;

  const sceneController = new SceneController(root);
  sceneController.activeScene = 'loading';
  sceneController.start();

  atlas.load('buttons').then(() => {
    if (window.location.hostname === 'localhost') {
      console.log('atlas', atlas.elements);
    }
    sceneController.activeScene = 'menu';
  });

  // TODO make InputController class
  const cheatcode = 'cheatcode';
  let input = '';
  const onKeyDown = (e: KeyboardEvent) => {
    // e.preventDefault();
    console.log(e);
    console.log(cheatcode[input.length] === e.key);
    if (cheatcode[input.length] === e.key) {
      input = input.concat(e.key);
    } else {
      input = '';
    }
    if (input === cheatcode) {
      console.log('cheatcode');
    }
  };

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    console.log('onContextMenu', e);
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('contextmenu', onContextMenu);
}
