import { containsCircle, intersectCircleCircle, intersectCircleHexagon, intersectCircleTriangle } from "../../../src/proc/collision";
import { Circle, Hexagon, Triangle } from "../../../src/shape";
import Vector2 from "../../../src/vector2";

describe("Circle Point", () => {
  const circle = new Circle(new Vector2(0, 0), 1);
  it('Point in circle', () => {
    const point = new Vector2(0.5, 0.5);
    expect(containsCircle(circle, point)).toBeTruthy();
  });
  it('Point in arc', () => {
    const point = new Vector2(0, 1);
    expect(containsCircle(circle, point)).toBeTruthy();
  });
  it('Point not in circle or arc', () => {
    const point = new Vector2(0, 2);
    expect(containsCircle(circle, point)).toBeFalsy();
  });
});

describe("Circle Circle", () => {
  const circle1 = new Circle(new Vector2(0, 0), 1);
  it('Circle in circle', () => {
    const circle2 = new Circle(new Vector2(0, 0), 0.5);
    expect(intersectCircleCircle(circle1, circle2)).toBeTruthy();
  });
  it('Circle intersect circle, 2 points', () => {
    const circle2 = new Circle(new Vector2(0, 1), 0.5);
    expect(intersectCircleCircle(circle1, circle2)).toBeTruthy();
  });
  it('Circle intersect circle, 1 point', () => {
    const circle2 = new Circle(new Vector2(0, 1.5), 0.5);
    expect(intersectCircleCircle(circle1, circle2)).toBeTruthy();
  });
  it('Circle not intersect circle', () => {
    const circle2 = new Circle(new Vector2(0, 2), 0.5);
    expect(intersectCircleCircle(circle1, circle2)).toBeFalsy();
  });
});

describe("Circle Triangle", () => {
  it('Circle in Triangle', () => {
    const circle = new Circle(new Vector2(0, 0), 0.1);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Triangle in Circle', () => {
    const circle = new Circle(new Vector2(0, 0), 3);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Circle intersect Triangle, 1 vertex', () => {
    const circle = new Circle(new Vector2(0, 2), 1);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Circle intersect Triangle, 1 point', () => {
    const circle = new Circle(new Vector2(0, -2), 1);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Circle intersect Triangle, 2 points', () => {
    const circle = new Circle(new Vector2(0, -2), 1.1);
    const triangle = Triangle.fromVertex(new Vector2(-1, -1), new Vector2(0, 1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Circle intersect Triangle, 2 points 1 vertex', () => {
    const circle = new Circle(new Vector2(-1.1, -1.1), 1);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeTruthy();
  });
  it('Circle not in triangle', () => {
    const circle = new Circle(new Vector2(2, 2), 1);
    const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectCircleTriangle(circle, triangle)).toBeFalsy();
  });
});

describe("Circle Hexagon", () => {
  it('Circle in Hexagon', () => {
    const circle = new Circle(new Vector2(0, 0), 0.1);
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
    expect(intersectCircleHexagon(circle, hexagon)).toBeTruthy();
  });
  it('Hexagon in Circle', () => {
    const circle = new Circle(new Vector2(0, 0), 3);
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
    expect(intersectCircleHexagon(circle, hexagon)).toBeTruthy();
  });
  it('Circle intersect Hexagon, 1 vertex', () => {
    const circle = new Circle(new Vector2(2, 0), 1);
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
    expect(intersectCircleHexagon(circle, hexagon)).toBeTruthy();
  });
  it('Circle intersect Hexagon, 2 points 1 vertex', () => {
    const circle = new Circle(new Vector2(-1, 0), 1.1);
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(1, 0), 1, 0);
    expect(intersectCircleHexagon(circle, hexagon)).toBeTruthy();
  });
  it('Circle not in Hexagon', () => {
    const circle = new Circle(new Vector2(-1, 0), 0.9);
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(1, 0), 1, 0);
    expect(intersectCircleHexagon(circle, hexagon)).toBeFalsy();
  });
});