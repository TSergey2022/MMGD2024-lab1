import Vector2 from "./vector2";

export default class AABB {

  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }

  size(): Vector2 {
    const width = this.maxX - this.minX;
    const heigth = this.maxY - this.minY;
    return new Vector2(width, heigth);
  }

  clone(): AABB {
    return new AABB(this.minX, this.maxX, this.minY, this.maxY);
  }

  intersectAABB(other: AABB): boolean {
    const xIntersect = this.minX <= other.maxX && this.maxX >= other.minX;
    const yIntersect = this.minY <= other.maxY && this.maxY >= other.minY;
    return xIntersect && yIntersect;
  }

}