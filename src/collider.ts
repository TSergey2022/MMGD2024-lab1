/* istanbul ignore file */

import Vector2 from "./vector2";
import Shape from "./shape";

export default class Collider {

  s: Shape;
  v: Vector2; // velocity
  l: number; // life
  c: boolean; // colliding

  constructor(s: Shape, v: Vector2, l: number, c: boolean = false) {
    this.s = s;
    this.v = v;
    this.l = l;
    this.c = c;
  }

  clone(): Collider {
    return new Collider(this.s.clone(), this.v.clone(), this.l, this.c);
  }

}