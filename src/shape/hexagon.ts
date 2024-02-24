import Vector2 from "../vector2";
import Shape from ".";
import Triangle from "./triangle";
import AABB from "../aabb";

class HexagonVertex {

  t1: Triangle;
  t2: Triangle;
  t3: Triangle;
  t4: Triangle;
  t5: Triangle;
  t6: Triangle;

  constructor(t1: Triangle, t2: Triangle, t3: Triangle, t4: Triangle, t5: Triangle, t6: Triangle) {
    this.t1 = t1;
    this.t2 = t2;
    this.t3 = t3;
    this.t4 = t4;
    this.t5 = t5;
    this.t6 = t6;
  }

  clone(): HexagonVertex {
    return new HexagonVertex(
      this.t1.clone(), this.t2.clone(), this.t3.clone(),
      this.t4.clone(), this.t5.clone(), this.t6.clone()
    );
  }
  
}

export default class Hexagon extends Shape {

  v: HexagonVertex;

  constructor(v: HexagonVertex) {
    super("hex");
    this.v = v;
  }

  center(): Vector2 {
    return this.v.t1.v.v3.clone();
  }

  aabb(): AABB {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;

    const aabbs = [this.v.t1, this.v.t2, this.v.t3, this.v.t4, this.v.t5, this.v.t6].map(t=>t.aabb());
  
    for (const aabb of aabbs) {
      minX = Math.min(minX, aabb.minX);
      minY = Math.min(minY, aabb.minY);
      maxX = Math.max(maxX, aabb.maxX);
      maxY = Math.max(maxY, aabb.maxY);
    }
  
    return new AABB(minX, maxX, minY, maxY);
  }

  clone(): Hexagon {
    return new Hexagon(this.v.clone());
  }
  
  static fromCenterLengthAngle(c: Vector2, l: number, a: number): Hexagon {
    const v: Vector2[] = [];
    const aa = [0, Math.PI / 3, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 5 * Math.PI / 3];
    aa.forEach(aaa => {
      const vv = new Vector2(c.x + l * Math.cos(aaa + a), c.y + l * Math.sin(aaa + a));
      v.push(vv);
    });
    const t: Triangle[] = [];
    for (let i = 0; i < v.length; i++) {
      const tt = Triangle.fromVertex(v[i].clone(), v[(i+1)%v.length].clone(), c.clone());
      t.push(tt);
    }
    return new Hexagon(new HexagonVertex(t[0], t[1], t[2], t[3], t[4], t[5]));
  }

}