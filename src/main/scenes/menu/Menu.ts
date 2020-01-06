import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { Title } from 'main/com/Title';
import { Button } from 'main/com/Button';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Menu extends Scene {
  init() {
    this.name = 'menu';
    this.container.resize(320, 480);
  }

  load() {
    super.load();
    const margin = 16;
    const centerX = this.container.center.x;

    const frame = new Frame(this.container.width, this.container.height);
    const title = new Title(text.mainMenu, new Vector2(centerX, margin));
    const newGameButton = new Button(text.newGame);
    newGameButton.moveTo(new Vector2(centerX, title.bottom.y + margin));
    const optionsButton = new Button(text.options);
    optionsButton.moveTo(new Vector2(centerX, newGameButton.bottom.y));
    this.container.add(frame, title, newGameButton, optionsButton);

    newGameButton.onClick = () => {
      console.log('onClick', this);
    }
  }
}
