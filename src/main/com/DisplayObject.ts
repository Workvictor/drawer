import { Transform } from 'main/com/Transform';
import { Renderer } from 'main/com/Renderer';
import { Vector2 } from 'main/com/Vector2';

export class DisplayObject extends Transform {
  constructor(w: number, h: number) {
    super(w, h);
    this.renderer = new Renderer(w, h);
  }

  set clickable(state: boolean){
    if (state) {
      window.addEventListener('click', this._onClick);
    } else {
      window.removeEventListener('click', this._onClick);
    }
  }

  onClick = () => {};

  private _onClick = (e: MouseEvent) => {
    console.log(e)
    if (this.collides(new Vector2(e.clientX, e.clientY))) {
      this.onClick();
    }
  };

  private _clickable = false;

  private _children: DisplayObject[] = [];

  private _parent?: DisplayObject;

  renderer: Renderer;

  setParent = (parent: DisplayObject) => {
    this._parent = parent;
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    this._children.forEach(child => {
      child.draw(this.renderer.ctx);
    });
    ctx.drawImage(this.renderer.canvas, ...this.position.xy);
  };

  moveTo = (position: Vector2) => {
    this.position = position;
    this._children.forEach(child => {
      child.moveTo(position);
    });
  };

  onResize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
    this.renderer.resize(w, h);
    this._children.forEach(child => {
      child.onResize(w, h);
    });
  };

  addChild = (child: DisplayObject) => {
    child.setParent(this);
    this._children.push(child);
  };

  collides = (position: Vector2) => {
    const globalPosition = this.globalPosition;
    return (
      position.x >= globalPosition.x &&
      position.x <= globalPosition.x + this.width &&
      position.y >= globalPosition.y &&
      position.y <= globalPosition.y + this.height
    );
  };

  get globalPosition() {
    if (this._parent) {
      return this.position.setOffset(this._parent.position);
    }
    return this.position;
  }
}
