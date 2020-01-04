export class Vector2 {
  constructor(public x = 0, public y = 0) {}
  setOffset = (offset: Vector2, sign: -1 | 1 = 1) => {
    this.x = this.x + offset.x * sign;
    this.y = this.y + offset.y * sign;
    return this;
  };
  equal = (position: Vector2) => {
    return this.x === position.x && this.y === position.y;
  };
  get xy(): [number, number] {
    return [this.x, this.y];
  }
}
