export class Vector2 {
  constructor(public x = 0, public y = 0) {}
  setOffset = (offset: Vector2, sign: -1 | 1 = 1) => {
    this.x = Math.floor(this.x + offset.x * sign);
    this.y = Math.floor(this.y + offset.y * sign);
    return this;
  };
  substract = (position: Vector2) => {
    return new Vector2(
      Math.floor(this.x / 2 - position.x / 2),
      Math.floor(this.y / 2 - position.y / 2)
    )
  };
  equal = (position: Vector2) => {
    return this.x === position.x && this.y === position.y;
  };
  get xy(): [number, number] {
    return [this.x, this.y];
  }
}
