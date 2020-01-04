import { Vector2 } from 'main/com/Vector2';

type PivotPosition = 'center' | 'top-center' | 'top-left' | 'top-right';

export class Transform {
  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  private _pivot: PivotPosition = 'center';

  private _position: Vector2 = new Vector2(0, 0);

  width: number;

  height: number;

  onResize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
  };

  set position(position: Vector2) {
    this._position = position;
  }

  get position() {
    const getOffset = () => {
      switch (this._pivot) {
        case 'top-right':
          return new Vector2(-this.width, 0);
        case 'top-center':
          return new Vector2(-Math.floor(this.width / 2), 0);
        case 'top-left':
          return new Vector2(0, 0);
        default:
          // center
          return new Vector2(
            -Math.floor(this.width / 2),
            -Math.floor(this.height / 2)
          );
      }
    };
    const offset = getOffset();
    return new Vector2(
      this._position.x + offset.x,
      this._position.y + offset.y
    );
  }

  set pivot(position: PivotPosition) {
    this._pivot = position;
  }
}
