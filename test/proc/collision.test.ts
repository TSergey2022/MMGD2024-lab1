import AABB from "../../src/aabb";
import Collider from "../../src/collider";
import { detectCollisions, detectEdgeCollisions, intersectShapeShape } from "../../src/proc/collision";
import { Circle, Hexagon, Triangle } from "../../src/shape";
import Vector2 from "../../src/vector2";

describe("intersectShapeShape", () => {
  it('All Shape Shape collisions', () => {
    const shapes = [
      new Circle(new Vector2(0, 0), 10),
      Triangle.fromCenterLengthAngle(new Vector2(0, 0), 20, 0),
      Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 10, 0)
    ]
    for (const shape1 of shapes)
      for (const shape2 of shapes)
        expect(()=>{intersectShapeShape(shape1, shape2)}).not.toThrow();
  });
});

describe("detectCollisions", () => {
  it('all collides', () => {
    const colliders = [
      new Collider(new Circle(new Vector2(-5, 0), 11), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(5, 0), 11), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(10, 0), 11), new Vector2(0, 0), 0),
    ]
    const collisions = detectCollisions(colliders).flat();
    expect(collisions).toContain(colliders[0]);
    expect(collisions).toContain(colliders[1]);
    expect(collisions).toContain(colliders[2]);
  });
  it('2 collides and 1 free', () => {
    const colliders = [
      new Collider(new Circle(new Vector2(-5, 0), 6), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(5, 0), 6), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(15, 0), 3), new Vector2(0, 0), 0),
    ]
    const collisions = detectCollisions(colliders).flat();
    expect(collisions).toContain(colliders[0]);
    expect(collisions).toContain(colliders[1]);
    expect(collisions).not.toContain(colliders[2]);
  });
  it('all free', () => {
    const colliders = [
      new Collider(new Circle(new Vector2(-5, 0), 4), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(5, 0), 4), new Vector2(0, 0), 0),
      new Collider(new Circle(new Vector2(0, 10), 4), new Vector2(0, 0), 0),
    ]
    const collisions = detectCollisions(colliders).flat();
    expect(collisions).toHaveLength(0);
  });
});

describe("detectEdgeCollisions", () => {
  const edge = new AABB(0, 100, 0, 100);
  it('All shapes free', () => {
    const colliders = [
      new Collider(new Circle(new Vector2(50, 50), 10), new Vector2(0, 0), 0),
      new Collider(Triangle.fromCenterLengthAngle(new Vector2(50, 50), 20, 0), new Vector2(0, 0), 0),
      new Collider(Hexagon.fromCenterLengthAngle(new Vector2(50, 50), 10, 0), new Vector2(0, 0), 0)
    ]
    const collisions = detectEdgeCollisions(colliders, edge);
    expect(collisions.left).toHaveLength(0);
    expect(collisions.right).toHaveLength(0);
    expect(collisions.top).toHaveLength(0);
    expect(collisions.bottom).toHaveLength(0);
  });
  it('Edge', () => {
    const centers = [
                           new Vector2(50,   0),
      new Vector2(0,  50),                       new Vector2(100,  50),
                           new Vector2(50, 100),
    ]
    for (let i = 0; i < 4; i++) {
      const colliders = [
        new Collider(new Circle(new Vector2(50, 50), 10), new Vector2(0, 0), 0),
        new Collider(Triangle.fromCenterLengthAngle(new Vector2(50, 50), 20, 0), new Vector2(0, 0), 0),
        new Collider(Hexagon.fromCenterLengthAngle(new Vector2(50, 50), 10, 0), new Vector2(0, 0), 0),
        new Collider(new Circle(centers[i], 10), new Vector2(0, 0), 0),
        new Collider(Triangle.fromCenterLengthAngle(centers[i], 20, 0), new Vector2(0, 0), 0),
        new Collider(Hexagon.fromCenterLengthAngle(centers[i], 10, 0), new Vector2(0, 0), 0)
      ]
      const collisions = detectEdgeCollisions(colliders, edge);
      expect(collisions.top).toHaveLength(i === 0 ? 3 : 0);
      expect(collisions.left).toHaveLength(i === 1 ? 3 : 0);
      expect(collisions.right).toHaveLength(i === 2 ? 3 : 0);
      expect(collisions.bottom).toHaveLength(i === 3 ? 3 : 0);
    }
  });
  it('Corner', () => {
    for (const center of [
      new Vector2(0,   0), new Vector2(100,   0),
      new Vector2(0, 100), new Vector2(100, 100),
    ]) {
      const colliders = [
        new Collider(new Circle(new Vector2(50, 50), 10), new Vector2(0, 0), 0),
        new Collider(Triangle.fromCenterLengthAngle(new Vector2(50, 50), 20, 0), new Vector2(0, 0), 0),
        new Collider(Hexagon.fromCenterLengthAngle(new Vector2(50, 50), 10, 0), new Vector2(0, 0), 0),
        new Collider(new Circle(center, 10), new Vector2(0, 0), 0),
        new Collider(Triangle.fromCenterLengthAngle(center, 20, 0), new Vector2(0, 0), 0),
        new Collider(Hexagon.fromCenterLengthAngle(center, 10, 0), new Vector2(0, 0), 0)
      ]
      const collisions = detectEdgeCollisions(colliders, edge);
      expect(collisions.left).toHaveLength(center.x === 0 ? 3 : 0);
      expect(collisions.right).toHaveLength(center.x === 100 ? 3 : 0);
      expect(collisions.top).toHaveLength(center.y === 0 ? 3 : 0);
      expect(collisions.bottom).toHaveLength(center.y === 100 ? 3 : 0);
    }
  });
});