/* istanbul ignore file */

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

}