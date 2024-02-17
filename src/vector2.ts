/* istanbul ignore file */

export default class Vector2 {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  add_(other: Vector2) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  add(other: Vector2) {
    return this.clone().add_(other);
  }

  sub_(other: Vector2) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  sub(other: Vector2) {
    return this.clone().sub_(other);
  }

  mul1_(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  mul2_(vector: Vector2) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }

  mul1(scalar: number) {
    return this.clone().mul1_(scalar);
  }

  mul2(vector: Vector2) {
    return this.clone().mul2_(vector);
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  static distance(l: Vector2, r: Vector2): number {
    return Math.sqrt(Vector2.distanceSquared(l, r));
  }

  static distanceSquared(l: Vector2, r: Vector2): number {
    const dx = r.x - l.x;
    const dy = r.y - l.y;
    return dx * dx + dy * dy;
  }

}