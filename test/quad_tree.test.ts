import AABB from '../src/aabb';
import Collider from '../src/collider';
import QuadTree from '../src/quad_tree';
import { Circle } from '../src/shape';
import Vector2 from '../src/vector2';

describe('QuadTree', () => {
  let quadTree: QuadTree;

  beforeEach(() => {
    const boundary = new AABB(0, 100, 0, 100);
    quadTree = new QuadTree(boundary);
  });

  test('inserting a collider increases length', () => {
    const collider = new Collider(new Circle(new Vector2(0, 0), 1), new Vector2(0, 0), 1);
    quadTree.insert(collider);
    expect(quadTree.length()).toBe(1);
  });

  test('inserting a point outside boundary returns false', () => {
    const collider = new Collider(new Circle(new Vector2(-10, -10), 1), new Vector2(0, 0), 1);
    expect(quadTree.insert(collider)).toBe(false);
    expect(quadTree.length()).toBe(0);
  });

  test('queryRange returns empty array', () => {
    const collider1 = new Collider(new Circle(new Vector2(49, 49), 1), new Vector2(0, 0), 1);
    const collider2 = new Collider(new Circle(new Vector2(0, 0), 40), new Vector2(0, 0), 1);
    const collider3 = new Collider(new Circle(new Vector2(52, 52), 1.1), new Vector2(0, 0), 1);
    quadTree.insert(collider1);
    quadTree.insert(collider2);
    quadTree.insert(collider3);
    const range = new AABB(-100, -10, -100, -10);
    const pointsInRange = quadTree.queryRange(range);
    expect(pointsInRange).toHaveLength(0);
  });

  test('queryRange returns points within range', () => {
    const collider1 = new Collider(new Circle(new Vector2(49, 49), 1), new Vector2(0, 0), 1);
    const collider2 = new Collider(new Circle(new Vector2(0, 0), 40), new Vector2(0, 0), 1);
    const collider3 = new Collider(new Circle(new Vector2(52, 52), 1.1), new Vector2(0, 0), 1);
    quadTree.insert(collider1);
    quadTree.insert(collider2);
    quadTree.insert(collider3);
    const range = new AABB(49, 51, 49, 51);
    const pointsInRange = quadTree.queryRange(range);
    expect(pointsInRange).toContain(collider1);
    expect(pointsInRange).not.toContain(collider2);
    expect(pointsInRange).toContain(collider3);
  });

  test('queryRange returns points within range', () => {
    const colliders = [
      new Collider(new Circle(new Vector2(25, 25), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(25, 75), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(75, 25), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(75, 75), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(50, 50), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(25, 50), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(50, 25), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(75, 50), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(50, 75), 5), new Vector2(0, 0), 1),
      new Collider(new Circle(new Vector2(55, 55), 5), new Vector2(0, 0), 1),
    ];
    for (const collider of colliders) quadTree.insert(collider);
    const range = new AABB(49, 51, 49, 51);
    const pointsInRange = quadTree.queryRange(range);
    expect(pointsInRange).toContain(colliders[4]);
    expect(pointsInRange).toContain(colliders[9]);
    const allCollisions = quadTree.getAllCollidingPairs();
    console.log(JSON.stringify(allCollisions));
    expect(allCollisions.length).toBe(1);
    expect(allCollisions[0]).toContain(colliders[4]);
    expect(allCollisions[0]).toContain(colliders[9]);
  });

  test('clear empties the quadtree', () => {
    const collider = new Collider(new Circle(new Vector2(49, 49), 1), new Vector2(0, 0), 1);
    quadTree.insert(collider);
    quadTree.clear();
    expect(quadTree.length()).toBe(0);
  });
});
