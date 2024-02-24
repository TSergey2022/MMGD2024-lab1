import Vector2 from "../vector2";
import Shape from ".";
import AABB from "../aabb";

export default class Circle extends Shape {

  c: Vector2; // center
  r: number; // radius

  constructor(c: Vector2, r: number) {
    super("circle");
    this.c = c;
    this.r = r;
  }

  center(): Vector2 {
    return this.c.clone();
  }

  aabb(): AABB {
    const minX = this.c.x - this.r;
    const maxX = this.c.x + this.r;
    const minY = this.c.y - this.r;
    const maxY = this.c.y + this.r;
    return new AABB(minX, maxX, minY, maxY);
  }

  clone(): Circle {
    return new Circle(this.c.clone(), this.r);
  }

}