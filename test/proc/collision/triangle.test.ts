import { containsTriangle, intersectTriangleHexagon, intersectTriangleTriangle } from "../../../src/proc/collision";
import { Hexagon, Triangle } from "../../../src/shape";
import Vector2 from "../../../src/vector2";

describe("Triangle Point", () => {
  const triangle = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
  it('Point in Triangle', () => {
    const point = new Vector2(0.1, 0.5);
    expect(containsTriangle(triangle, point)).toBeTruthy();
  });
  it('Point in vertex', () => {
    const point = new Vector2(0, 1);
    expect(containsTriangle(triangle, point)).toBeTruthy();
  });
  it('Point in segment', () => {
    const point = new Vector2(-0.696969, -1);
    expect(containsTriangle(triangle, point)).toBeTruthy();
  });
  it('Point not in Triangle', () => {
    const point = new Vector2(2, 2);
    expect(containsTriangle(triangle, point)).toBeFalsy();
  });
});

describe("Triangle Triangle", () => {
  const triangle1 = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, -1), new Vector2(1, -1));
  it('Triangle in Triangle', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(0, 2), new Vector2(-2, -2), new Vector2(2, -2));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeTruthy();
  });
  it('Triangle intersect Triangle, 2 points', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(0, 0), new Vector2(-1, -2), new Vector2(1, -2));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeTruthy();
  });
  it('Triangle intersect Triangle, 6 points', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(0, -1.1), new Vector2(-1, 0.9), new Vector2(1, 0.9));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeTruthy();
  });
  it('Triangle intersect Triangle, 1 segment 2 vertex', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(0, -2), new Vector2(-1, -1), new Vector2(1, -1));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeTruthy();
  });
  it('Triangle intersect Triangle, 1 vertex', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(0, 1), new Vector2(-1, 2), new Vector2(1, 2));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeTruthy();
  });
  it('Triangle not in Triangle', () => {
    const triangle2 = Triangle.fromVertex(new Vector2(-1, 2), new Vector2(-2, -2), new Vector2(-2, 2));
    expect(intersectTriangleTriangle(triangle1, triangle2)).toBeFalsy();
  });
});

describe("Triangle Hexagon", () => {
  it('Triangle in Hexagon', () => {
    const triangle = Triangle.fromVertex(new Vector2(1, 0), new Vector2(-1, -1), new Vector2(-1, 1));
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 5, 0);
    expect(intersectTriangleHexagon(triangle, hexagon)).toBeTruthy();
  });
  it('Hexagon in Triangle', () => {
    const triangle = Triangle.fromVertex(new Vector2(3, 0), new Vector2(-1, -1), new Vector2(-1, 1));
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 0.2, 0);
    expect(intersectTriangleHexagon(triangle, hexagon)).toBeTruthy();
  });
  it('Triangle intersect Hexagon, 1 vertex', () => {
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(2, 0), 1, 0);
    const triangle = Triangle.fromVertex(hexagon.v.t4.v.v1.clone(), new Vector2(-1, -1), new Vector2(-1, 1));
    expect(intersectTriangleHexagon(triangle, hexagon)).toBeTruthy();
  });
  it('Triangle intersect Hexagon, 2 points', () => {
    const triangle = Triangle.fromVertex(new Vector2(-0.5, 0), new Vector2(-2, -2), new Vector2(-2, 2));
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
    expect(intersectTriangleHexagon(triangle, hexagon)).toBeTruthy();
  });
  it('Triangle not in Hexagon', () => {
    const triangle = Triangle.fromVertex(new Vector2(-2, 0), new Vector2(-3, -2), new Vector2(-3, 2));
    const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
    expect(intersectTriangleHexagon(triangle, hexagon)).toBeFalsy();
  });
});