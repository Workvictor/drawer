import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { Title } from 'main/com/Title';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Loading extends Scene {
  init() {
    super.init();
    this.name = 'loading';
    this.container.resize(320, 180);
    const margin = 16;
    const centerX = this.container.center.x;

    const frame = new Frame(this.container.width, this.container.height);
    const title = new Title(text.loading, new Vector2(centerX, margin));

    this.container.add(frame, title);
  }
}
