import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { Button } from 'main/com/Button';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';
import { DisplayText } from 'main/com/DisplayText';

export class Menu extends Scene {
  init() {
    this.name = 'menu';
    this.container.Resize(320, 480);
  }

  load() {
    super.load();
    const { width, height } = this.container;
    const center= this.container.GetAnchorPosition('center');

    const frame = new Frame(width, height);

    const title = new DisplayText({
      text: text.mainMenu,
      wrapWidth: 0,
      size: 32,
      weight: 700
    });
    title.pivot = 'top-center';
    title.moveTo(this.container.GetAnchorPosition('top-center'));

    const newGameButton = new Button(text.newGame);
    newGameButton.pivot = 'top-center';
    newGameButton.moveTo(new Vector2(center.x, title.position.y + title.height));

    const optionsButton = new Button(text.options);
    optionsButton.pivot = 'top-center';
    optionsButton.moveTo(new Vector2(center.x, newGameButton.position.y + newGameButton.height));

    this.container.add(frame, title, newGameButton, optionsButton);

    newGameButton.onClick = this.onNewGame;
  }

  onNewGame = () => {
    console.log('onClick', this);
  };
}
