import { Renderer } from 'main/com/Renderer';
import { Vector2 } from 'main/com/Vector2';

type PivotPosition =
  | 'center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center';

export class DisplayObject {
  constructor(w: number, h: number) {
    this.renderer = new Renderer(w, h);
  }

  private _children: DisplayObject[] = [];

  private _parent?: DisplayObject;

  private _shouldUpdate = true;

  set shouldUpdate(state: boolean) {
    this._shouldUpdate = state;
    if (this.parent) {
      this.parent.shouldUpdate = state;
    }
  }

  get shouldUpdate() {
    return this._shouldUpdate;
  }

  get parent() {
    return this._parent;
  }

  renderer: Renderer;

  setParent = (parent: DisplayObject) => {
    this._parent = parent;
  };

  get ctx() {
    return this.renderer.ctx;
  }

  get canvas() {
    return this.renderer.canvas;
  }

  get width() {
    return this.renderer.width;
  }

  get height() {
    return this.renderer.height;
  }

  /**
   * children will recalculate there position independently, relying parent position
   */
  moveTo = (position: Vector2) => {
    this._position = position;
    this._shouldUpdate = true;
  };

  onUpdate = (t: number) => {
    if (this._shouldUpdate) {
      // this.renderer.clear();
      this._shouldUpdate = false;
      this._children.forEach(child => {
        child.onUpdate(t);
      });
    }
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    this._children.forEach(child => {
      child.draw(this.ctx);
    });
    ctx.drawImage(this.canvas, ...this.position.xy);
  };

  resize = (w: number, h: number) => {
    this._shouldUpdate = true;
    this.renderer.resize(w, h);
    this._children.forEach(child => {
      child.resize(w, h);
    });
  };

  addChild = (...children: DisplayObject[]) => {
    children.forEach(child => {
      child.setParent(this);
      this._children.push(child);
    });
    // if (Array.isArray(children)) {
    // }
    this._shouldUpdate = true;
    // children.setParent(this);
    // this._children.push(children);
  };

  /**
   * check if position is laying transform rect
   * @param position
   */
  collides = (position: Vector2) => {
    const pos = this.globalPosition;
    return (
      position.x >= pos.x &&
      position.x <= pos.x + this.width &&
      position.y >= pos.y &&
      position.y <= pos.y + this.height
    );
  };

  /**
   * global position is for handling mouse client position
   */
  get globalPosition() {
    if (this._parent) {
      return new Vector2(...this.position.xy).setOffset(this._parent.position);
    }
    return new Vector2(...this.position.xy);
  }

  private _pivot: PivotPosition = 'center';

  private _position: Vector2 = new Vector2(0, 0);

  getBoundsPosition = (pivot: PivotPosition) => {
    const pivotPosition = this._pivotPosition(pivot);
    return new Vector2(
      this._position.x + pivotPosition.x,
      this._position.y + pivotPosition.y
    );
  };

  private _pivotPosition = (pivot: PivotPosition) => {
    switch (pivot) {
      case 'top-right':
        return new Vector2(this.width, 0);
      case 'top-center':
        return new Vector2(this.width / 2, 0);
      case 'top-left':
        return new Vector2(0, 0);
      case 'bottom-center':
        return new Vector2(this.width / 2, this.height);
      default:
        // center
        return new Vector2(this.width / 2, this.height / 2);
    }
  };

  get bottom() {
    return this.getBoundsPosition('bottom-center')
  }

  get position() {
    const pivotPosition = this._pivotPosition(this._pivot);
    return new Vector2(
      this._position.x - pivotPosition.x,
      this._position.y - pivotPosition.y
    );
  }

  set pivot(position: PivotPosition) {
    this._pivot = position;
  }
}
