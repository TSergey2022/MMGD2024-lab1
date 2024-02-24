import Vector2 from "../vector2";
import Collider from "../collider";
import { Shape, Circle, Triangle, Hexagon } from "../shape";
import AABB from "../aabb";
import { distToSegment } from "../utils";

const TABLE1 = {
  "circle": {
    "circle": intersectCircleCircle,
    "tri": intersectCircleTriangle,
    "hex": intersectCircleHexagon,
  },
  "tri": {
    "circle": intersectTriangleCircle,
    "tri": intersectTriangleTriangle,
    "hex": intersectTriangleHexagon,
  },
  "hex": {
    "circle": intersectHexagonCircle,
    "tri": intersectHexagonTriangle,
    "hex": intersectHexagonHexagon,
  }
}

export function containsCircle(s: Circle, p: Vector2): boolean {
  const distance = (s.c.x - p.x) ** 2 + (s.c.y - p.y) ** 2;
  return distance <= s.r ** 2;
}

// Barycentric coordinate system
export function containsTriangle(s: Triangle, p: Vector2): boolean {
  const b1 = ((s.v.v2.y - s.v.v3.y) * (p.x - s.v.v3.x) + (s.v.v3.x - s.v.v2.x) * (p.y - s.v.v3.y)) /
    ((s.v.v2.y - s.v.v3.y) * (s.v.v1.x - s.v.v3.x) + (s.v.v3.x - s.v.v2.x) * (s.v.v1.y - s.v.v3.y));
  const b2 = ((s.v.v3.y - s.v.v1.y) * (p.x - s.v.v3.x) + (s.v.v1.x - s.v.v3.x) * (p.y - s.v.v3.y)) /
    ((s.v.v2.y - s.v.v3.y) * (s.v.v1.x - s.v.v3.x) + (s.v.v3.x - s.v.v2.x) * (s.v.v1.y - s.v.v3.y));
  const b3 = 1 - b1 - b2;
  return b1 >= 0 && b2 >= 0 && b3 >= 0;
}

export function containsHexagon(s: Hexagon, p: Vector2): boolean {
  for (const tri of [s.v.t1, s.v.t2, s.v.t3, s.v.t4, s.v.t5, s.v.t6]) {
    if (containsTriangle(tri, p)) return true;
  }
  return false;
}

function doSegmentsIntersect(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): boolean {
  const d1 = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
  const d2 = (p2.x - p1.x) * (p4.y - p1.y) - (p4.x - p1.x) * (p2.y - p1.y);
  const d3 = (p4.x - p3.x) * (p1.y - p3.y) - (p1.x - p3.x) * (p4.y - p3.y);
  const d4 = (p4.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p4.y - p3.y);
  return (d1 * d2 < 0) && (d3 * d4 < 0);
}

// intersectCircle

export function intersectCircleCircle(circle1: Circle, circle2: Circle): boolean {
  return Vector2.distance(circle1.c, circle2.c) <= circle1.r + circle2.r;
}
export function intersectCircleTriangle(circle: Circle, tri: Triangle): boolean {
  if (distToSegment(circle.c, tri.v.v1, tri.v.v2) <= circle.r) return true;
  if (distToSegment(circle.c, tri.v.v2, tri.v.v3) <= circle.r) return true;
  if (distToSegment(circle.c, tri.v.v3, tri.v.v1) <= circle.r) return true;
  if (containsTriangle(tri, circle.c)) return true;
  return false;
}
export function intersectCircleHexagon(circle: Circle, hex: Hexagon): boolean {
  for (const tri of [hex.v.t1, hex.v.t2, hex.v.t3, hex.v.t4, hex.v.t5, hex.v.t6]) {
    if (intersectCircleTriangle(circle, tri)) return true;
  }
  return false;
}

// intersectTriangle

export function intersectTriangleCircle(tri: Triangle, circle: Circle): boolean {
  return intersectCircleTriangle(circle, tri);
}
export function intersectTriangleTriangle(tri1: Triangle, tri2: Triangle): boolean {
  const edges1 = [
    { start: tri1.v.v1, end: tri1.v.v2 },
    { start: tri1.v.v2, end: tri1.v.v3 },
    { start: tri1.v.v3, end: tri1.v.v1 }
  ];

  const edges2 = [
    { start: tri2.v.v1, end: tri2.v.v2 },
    { start: tri2.v.v2, end: tri2.v.v3 },
    { start: tri2.v.v3, end: tri2.v.v1 }
  ];

  for (const edge1 of edges1)
    for (const edge2 of edges2)
      if (doSegmentsIntersect(edge1.start, edge1.end, edge2.start, edge2.end))
        return true;
  for (const v of [tri1.v.v1, tri1.v.v2, tri1.v.v3])
    if (containsTriangle(tri2, v))
      return true;
  for (const v of [tri2.v.v1, tri2.v.v2, tri2.v.v3])
    if (containsTriangle(tri1, v))
      return true;

  return false;
}
export function intersectTriangleHexagon(tri: Triangle, hex: Hexagon): boolean {
  for (const tri2 of [hex.v.t1, hex.v.t2, hex.v.t3, hex.v.t4, hex.v.t5, hex.v.t6]) {
    if (intersectTriangleTriangle(tri, tri2)) return true;
  }
  return false;
}

// intersectHexagon

export function intersectHexagonCircle(hex: Hexagon, circle: Circle): boolean {
  return intersectCircleHexagon(circle, hex);
}
export function intersectHexagonTriangle(hex: Hexagon, tri: Triangle): boolean {
  return intersectTriangleHexagon(tri, hex);
}
export function intersectHexagonHexagon(hex1: Hexagon, hex2: Hexagon): boolean {
  for (const tri1 of [hex1.v.t1, hex1.v.t2, hex1.v.t3, hex1.v.t4, hex1.v.t5, hex1.v.t6]) {
    for (const tri2 of [hex2.v.t1, hex2.v.t2, hex2.v.t3, hex2.v.t4, hex2.v.t5, hex2.v.t6]) {
      if (intersectTriangleTriangle(tri1, tri2)) return true;
    }
  }
  return false;
}

export function intersectShapeShape(shape1: Shape, shape2: Shape): boolean {
  return TABLE1[shape1.type][shape2.type](shape1 as any, shape2 as any);
}

export function detectCollisions(colliders: Collider[]): [Collider, Collider][] {
  const pairs: [Collider, Collider][] = [];

  for (let i = 0; i < colliders.length; i++) {
    const obj1 = colliders[i];
    for (let j = i + 1; j < colliders.length; j++) {
      const obj2 = colliders[j];
      if (intersectShapeShape(obj1.s, obj2.s)) {
        pairs.push([obj1, obj2]);
      }
    }
  }

  for (let i = 1; i <= pairs.length; i++) {
    const pair1 = pairs[pairs.length - i];
    for (let j = i + 1; j <= pairs.length; j++) {
      const pair2 = pairs[pairs.length - j];
      if ((pair1[0] === pair2[0]) && (pair1[1] === pair2[1])) {
        pairs.splice(pairs.length - i, 1); break;
      }
      if ((pair1[0] === pair2[1]) && (pair1[1] === pair2[0])) {
        pairs.splice(pairs.length - i, 1); break;
      }
    }
  }

  return pairs;
}

export function detectEdgeCollisions(colliders: Array<Collider>, edge: AABB) {
  const collisions = {
    left: Array<Collider>(),
    right: Array<Collider>(),
    top: Array<Collider>(),
    bottom: Array<Collider>(),
  }
  for (const obj of colliders) {
    if (obj.s.aabb().minX < edge.minX) {
      collisions.left.push(obj);
    } else if (obj.s.aabb().maxX > edge.maxX) {
      collisions.right.push(obj);
    }
    if (obj.s.aabb().minY < edge.minY) {
      collisions.top.push(obj);
    } else if (obj.s.aabb().maxY > edge.maxY){
      collisions.bottom.push(obj);
    }
  }
  return collisions;
}