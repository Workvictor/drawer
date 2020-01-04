import { Vector2 } from 'main/com/Vector2';
import { Observer } from 'main/utils/Observer';

export class MouseController {
  constructor() {
    window.addEventListener('mousemove', this._onMove);
    window.addEventListener('click', this._onClick);
  }

  private _destroy = () => {
    Object.entries(this.on).forEach(([_, action]) => {
      action.destroy();
    });
  };

  private _move = new Observer<Vector2>();

  private _click = new Observer<Vector2>();

  get on() {
    return {
      move: this._move,
      click: this._click
    };
  }

  private _position: Vector2 = new Vector2();

  private _eventProxy = (eventHandler: (pos: Vector2) => void) => (
    e: MouseEvent
  ) => {
    const { clientX, clientY } = e;
    eventHandler(new Vector2(clientX, clientY));
  };

  private _onClick = this._eventProxy(pos => {
    this.on.click.broadcast(pos);
  });

  private _onMove = this._eventProxy(pos => {
    this.on.move.broadcast(pos);
  });
}
