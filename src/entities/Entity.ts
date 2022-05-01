import { Vector2 } from "../math/Vector2";

export class Entity {
  public position: Vector2 = new Vector2();

  constructor(x: number, y: number) {
    this.position = new Vector2(x, y);
  }
}
