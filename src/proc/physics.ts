import Collider from "../collider";
import Shape, { Circle, Hexagon, Triangle } from "../shape";
import Vector2 from "../vector2";

export function moveCircle(c: Circle, v: Vector2) {
  c.c.add_(v);
}

export function moveTriangle(t: Triangle, v: Vector2) {
  t.v.v1.add_(v);
  t.v.v2.add_(v);
  t.v.v3.add_(v);
}

export function moveHexagon(h: Hexagon, v: Vector2) {
  moveTriangle(h.v.t1, v);
  moveTriangle(h.v.t2, v);
  moveTriangle(h.v.t3, v);
  moveTriangle(h.v.t4, v);
  moveTriangle(h.v.t5, v);
  moveTriangle(h.v.t6, v);
}

export function moveShape(s: Shape, v: Vector2) {
  if (s.type === "circle") moveCircle(s as Circle, v);
  else if (s.type === "tri") moveTriangle(s as Triangle, v);
  else if (s.type === "hex") moveHexagon(s as Hexagon, v);
  else throw new Error("moveShape out of range");
}

export function moveCollider(c: Collider) {
  moveShape(c.s, c.v);
}

/* istanbul ignore next */
export function applyGeneralElasticCollision(c1: Collider, c2: Collider): void {
  const vCollision = c2.s.center().clone().sub_(c1.s.center());
  const distance = Vector2.distance(c1.s.center(), c2.s.center());
  const vCollisionNorm = new Vector2(vCollision.x / distance, vCollision.y / distance);
  const vRelativeVelocity = c1.v.clone().sub_(c2.v);
  const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
  if (speed < 0) return;
  c1.v.sub_(vCollisionNorm.mul1(speed));
  c2.v.add_(vCollisionNorm.mul1(speed));
}