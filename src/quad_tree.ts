import AABB from './aabb';
import Collider from './collider';
import { detectCollisions } from './proc/collision';

class QuadTreeChildren {

  topLeft: QuadTree;
  topRight: QuadTree;
  bottomLeft: QuadTree;
  bottomRight: QuadTree;

  constructor() {
    this.topLeft = null;
    this.topRight = null;
    this.bottomLeft = null;
    this.bottomRight = null;
  }

  asArray(): QuadTree[] {
    return [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight];
  }

  static fromArray(arr: [QuadTree, QuadTree, QuadTree, QuadTree]) {
    const children = new QuadTreeChildren();
    children.topLeft = arr[0];
    children.topRight = arr[1];
    children.bottomLeft = arr[2];
    children.bottomRight = arr[3];
    return children;
  }

}

export default class QuadTree {

  points: Collider[];
  boundary: AABB;
  capacity: number;
  children: QuadTreeChildren;

  constructor(boundary: AABB, capacity: number = 4) {
    this.points = [];
    this.boundary = boundary;
    this.capacity = capacity
    this.children = null;
  }

  getAllCollidingPairs(): [Collider, Collider][] {
    const pairs = [];
    pairs.push(...detectCollisions(this.points));
    if (this.children !== null) {
      for (const child of this.children.asArray()) {
        pairs.push(...child.getAllCollidingPairs());
      }
    }
    return pairs;
  }

  insert(point: Collider) {
    if (!this.boundary.intersectAABB(point.s.aabb())) return false;

    if (this.length() < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (this.children === null) this.subdivide();

    let rez = false;

    if (this.children.topLeft.insert(point)) rez = true;
    if (this.children.topRight.insert(point)) rez = true;
    if (this.children.bottomLeft.insert(point)) rez = true;
    if (this.children.bottomRight.insert(point)) rez = true;

    return rez;
  }

  length(): number {
    let count = this.points.length;
    if (this.children !== null) {
      for (const child of this.children.asArray()) {
        count += child.length();
      }
    }
    return count
  }

  queryRange(rect: AABB): Collider[] {
    const pointsInRange: Collider[] = [];

    if (!this.boundary.intersectAABB(rect))
      return pointsInRange;

    for (const p of this.points) {
      if (rect.intersectAABB(p.s.aabb()))
        pointsInRange.push(p);
    }

    if (this.children === null)
      return pointsInRange;
    
    pointsInRange.push(...this.children.topLeft.queryRange(rect));
    pointsInRange.push(...this.children.topRight.queryRange(rect));
    pointsInRange.push(...this.children.bottomLeft.queryRange(rect));
    pointsInRange.push(...this.children.bottomRight.queryRange(rect));

    return pointsInRange;
  }

  subdivide() {
    const hs = this.boundary.clone().size().mul1_(0.5);
    const b = this.boundary;
    this.children = QuadTreeChildren.fromArray([
      new QuadTree(new AABB(b.minX, b.maxX-hs.x, b.minY, b.maxY-hs.y), this.capacity * 2),
      new QuadTree(new AABB(b.minX+hs.x, b.maxX, b.minY, b.maxY-hs.y), this.capacity * 2),
      new QuadTree(new AABB(b.minX, b.maxX-hs.x, b.minY+hs.y, b.maxY), this.capacity * 2),
      new QuadTree(new AABB(b.minX+hs.x, b.maxX, b.minY+hs.y, b.maxY), this.capacity * 2)
    ]);
    this.children.asArray().forEach(c => {
      this.points.forEach(p => c.insert(p));
    })
  }

  clear() {
    this.points = [];
    this.children = null;
  }
  
}