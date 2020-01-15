import { Vector2 } from 'main/com/Vector2';
import { Drawer } from 'main/com/Drawer';
import { mouseController } from 'main/main';

type PivotPosition =
  | 'center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center';

export class DisplayObject extends Drawer {
  debug: boolean = false;

  protected _mouseController = mouseController;

  private _children: DisplayObject[] = [];

  private _parent: DisplayObject | null = null;

  private _shouldUpdate = true;

  set shouldUpdate(state: boolean) {
    this._shouldUpdate = state;
    if (this._parent) {
      this._parent.shouldUpdate = state;
    }
  }

  get shouldUpdate() {
    return this._shouldUpdate;
  }

  set parent(parent: DisplayObject | null) {
    this._parent = parent;
  }

  /**
   * children will recalculate there position independently, relying parent position
   */
  moveTo(position: Vector2) {
    this._position = position;
    this._shouldUpdate = true;
  }

  update(t: number) {
    this._children.forEach(child => {
      child.update(t);
      if (child.shouldUpdate) {
        this.shouldUpdate = true;
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.debug) {
      this.ctx.save();
      this.ctx.strokeStyle = '#4ae338';
      this.ctx.strokeRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }
    this._children.forEach(child => {
      child.draw(this.ctx);
    });
    const {
      width,
      height,
      position: { x, y }
    } = this;
    ctx.drawImage(this.canvas, 0, 0, width, height, x, y, width, height);
    this._shouldUpdate = false;
  }

  /*
   * add children
   */
  add(...children: DisplayObject[]) {
    children.forEach(child => {
      child.parent = this;
      this._children.push(child);
    });
  }

  /**
   * check if position is laying transform rect
   * @param position
   */
  collides(position: Vector2) {
    const pos = this.globalPosition;
    return (
      position.x >= pos.x &&
      position.x <= pos.x + this.width &&
      position.y >= pos.y &&
      position.y <= pos.y + this.height
    );
  }

  /**
   * global position is for handling mouse client position
   */
  get globalPosition() {
    if (this._parent) {
      return new Vector2(...this.position.xy).setOffset(this._parent.position);
    }
    return new Vector2(...this.position.xy);
  }

  private pivot: PivotPosition = 'center';

  private _position: Vector2 = new Vector2(0, 0);

  private _getBoundsPosition(pivot: PivotPosition) {
    const pivotPosition = this._pivotPosition(pivot);
    return new Vector2(
      this._position.x + pivotPosition.x,
      this._position.y + pivotPosition.y
    );
  }

  private _pivotPosition(pivot: PivotPosition) {
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
  }

  get position() {
    const pivotPosition = this._pivotPosition(this.pivot);
    return new Vector2(
      this._position.x - pivotPosition.x,
      this._position.y - pivotPosition.y
    );
  }

  SetPivotPosition(position: PivotPosition){
    this.pivot = position;
  }
}
