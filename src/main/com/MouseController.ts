import { Vector2 } from 'main/com/Vector2';
import { Observer, Subscriber } from 'main/utils/Observer';

const emitters = {
  move: new Observer<Vector2>(),
  touch: new Observer<Vector2>(),
  touchEnd: new Observer<Vector2>(),
  click: new Observer<Vector2>()
};

type Emitter = keyof typeof emitters;
type EmitEvent = MouseEvent | TouchEvent;

export class MouseController {
  constructor() {
    window.addEventListener('click', this._eventEmit('click'), false);

    window.addEventListener('mousedown', this._eventEmit('touch'), false);
    window.addEventListener('mousemove', this._eventEmit('move'), false);
    window.addEventListener('mouseup', this._eventEmit('touchEnd'), false);

    window.addEventListener('touchstart', this._eventEmit('touch'), false);
    window.addEventListener('touchmove', this._eventEmit('move'), false);
    window.addEventListener('touchend', this._eventEmit('touchEnd'), false);
  }

  private _destroy = () => {
    Object.entries(this._emitters).forEach(([_, action]) => {
      action.destroy();
    });
  };

  private _emitters = emitters;

  subscribe = (on: Emitter, fn: Subscriber<Vector2>) =>
    this._emitters[on].subscribe(fn);

  unsubscribe = (on: Emitter, fn: Subscriber<Vector2>) =>
    this._emitters[on].unsubscribe(fn);

  private _getXY = (e: EmitEvent): Vector2 => {
    const { clientX, clientY } =
      e instanceof TouchEvent ? e.changedTouches[0] : e;
    return new Vector2(clientX, clientY);
  };

  private _eventEmit = (on: Emitter) => (e: EmitEvent) => {
    this._emitters[on].broadcast(this._getXY(e));
  };
}
