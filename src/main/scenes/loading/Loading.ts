import { Scene } from 'main/com/Scene';
import { Vector2 } from 'main/com/Vector2';
import { Frame } from 'main/scenes/menu/Frame';
import { text } from 'main/text';

export class Loading extends Scene {
  init() {
    super.init();
    this.name = 'loading';
    this.container.Resize(320, 180);
    const margin = 16;
    const centerX = this.container.GetAnchorPosition('center').x;

    const frame = new Frame(this.container.width, this.container.height);

    this.container.add(frame);
  }
}
