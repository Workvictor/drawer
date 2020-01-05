import './index.css';

import { SceneController } from 'main/SceneController';
import { Renderer } from 'main/com/Renderer';
import { TextStyle } from 'main/com/TextStyle';
import { DisplayFont } from 'main/com/DisplayFont';
import { MouseController } from 'main/com/MouseController';
import { Atlas } from 'main/atlas/Atlas';

const mouseController = new MouseController();

const atlas = new Atlas();

export { mouseController, atlas };

export function main(root: HTMLElement) {
  const displayFont = new DisplayFont();
  const textStyle = new TextStyle({
    font: displayFont.font
  });

  Renderer.global = {
    textStyle,
    displayFont
  };

  const sceneController = new SceneController(new Renderer(), root);
  sceneController.activeScene = 'loading';
  sceneController.start();

  atlas.load('buttons').then(()=>{
    console.table(atlas.elements);
    sceneController.activeScene = 'menu';
  });


  // TODO make InputController class
  const cheatcode = 'cheatcode';
  let input = '';
  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(cheatcode[input.length] === e.key);
    if (cheatcode[input.length] === e.key) {
      input = input.concat(e.key);
    } else {
      input = '';
    }
    if (input === cheatcode) {
      console.log('cheatcode activated');
    }
  };

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e);
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('contextmenu', onContextMenu);
}
