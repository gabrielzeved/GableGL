export class Vector2 {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  addVector(vec: Vector2) {
    return this.add(vec.x, vec.y);
  }

  add(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  subVector(vec: Vector2) {
    return this.sub(vec.x, vec.y);
  }

  sub(x: number, y: number) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  mul(multiplier: number) {
    this.x *= multiplier;
    this.y *= multiplier;
    return this;
  }
}
