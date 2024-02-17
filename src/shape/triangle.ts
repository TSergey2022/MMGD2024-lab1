/* istanbul ignore file */

import Vector2 from "../vector2";
import Shape from ".";
import AABB from "../aabb";

class TriangleVertex {

  v1: Vector2;
  v2: Vector2;
  v3: Vector2;

  constructor(v1: Vector2, v2: Vector2, v3: Vector2) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }

  clone(): TriangleVertex {
    return new TriangleVertex(this.v1.clone(), this.v2.clone(), this.v3.clone());
  }
  
}

export default class Triangle extends Shape {

  v: TriangleVertex;

  constructor(v: TriangleVertex) {
    super("tri");
    this.v = v;
  }

  center(): Vector2 {
    const centerX = (this.v.v1.x + this.v.v2.x + this.v.v3.x) / 3;
    const centerY = (this.v.v1.y + this.v.v2.y + this.v.v3.y) / 3;
    return new Vector2(centerX, centerY);
  }

  aabb(): AABB {
    const minX = Math.min(this.v.v1.x, this.v.v2.x, this.v.v3.x);
    const minY = Math.min(this.v.v1.y, this.v.v2.y, this.v.v3.y);
    const maxX = Math.max(this.v.v1.x, this.v.v2.x, this.v.v3.x);
    const maxY = Math.max(this.v.v1.y, this.v.v2.y, this.v.v3.y);
    return new AABB(minX, maxX, minY, maxY);
  }

  clone(): Triangle {
    return new Triangle(this.v.clone());
  }

  static fromVertex(v1: Vector2, v2: Vector2, v3: Vector2): Triangle {
    return new Triangle(new TriangleVertex(v1, v2, v3));
  }
  
  static fromCenterLengthAngle(c: Vector2, l: number, a: number): Triangle {
    const r = l * Math.sqrt(3) / 3
    const a1 = a;
    const a2 = a1 + (2 * Math.PI) / 3;
    const a3 = a1 + (4 * Math.PI) / 3;
    const v1 = new Vector2(c.x + r * Math.cos(a1), c.y + r * Math.sin(a1));
    const v2 = new Vector2(c.x + r * Math.cos(a2), c.y + r * Math.sin(a2));
    const v3 = new Vector2(c.x + r * Math.cos(a3), c.y + r * Math.sin(a3));
    return new Triangle(new TriangleVertex(v1, v2, v3));
  }

}