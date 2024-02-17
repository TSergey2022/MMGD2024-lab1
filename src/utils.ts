import Vector2 from "./vector2";
import { Circle, Triangle, Hexagon } from "./shape";
import Collider from "./collider";
import Game from "./game";

function distToSegmentSquared(p: Vector2, v: Vector2, w: Vector2): number {
  var l2 = Vector2.distanceSquared(v, w);
  if (l2 == 0) return Vector2.distanceSquared(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Vector2.distanceSquared(p, new Vector2(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
}
export function distToSegment(p: Vector2, v: Vector2, w: Vector2) {
  return Math.sqrt(distToSegmentSquared(p, v, w));
}

export function getRandomNormalizedVector(): Vector2 {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const length = Math.sqrt(x * x + y * y);
  const normalizedX = x / length;
  const normalizedY = y / length;
  return new Vector2(normalizedX, normalizedY);
}

/* istanbul ignore next */
function getRandomAngle(): number {
  return Math.random() * 2 * Math.PI - Math.PI;
}

/* istanbul ignore next */
export function makeCircleOfColliders(game: Game, c: Vector2, r: number, count: number) {
  const size = 20;
  const angleDelta = (2 * Math.PI) / count;
  for (let i = 0; i < count; i++) {
    const angle = i * angleDelta;
    const pos = new Vector2(c.x + r * Math.cos(angle), c.y + r * Math.sin(angle))
    const velocity = getRandomNormalizedVector().mul1_(Math.random() * 4);
    
    if (i % 3 == 0) game.gameObjects.push(new Collider(new Circle(pos, size / 2), velocity, 3));
    else if (i % 3 == 1) game.gameObjects.push(new Collider(Triangle.fromCenterLengthAngle(pos, size, getRandomAngle()), velocity, 3));
    else if (i % 3 == 2) game.gameObjects.push(new Collider(Hexagon.fromCenterLengthAngle(pos, size / 2, getRandomAngle()), velocity, 3));
  }
}