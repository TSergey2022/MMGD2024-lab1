import { containsHexagon, intersectHexagonHexagon } from "../../../src/proc/collision";
import { Hexagon } from "../../../src/shape";
import Vector2 from "../../../src/vector2";

describe("Hexagon Point", () => {
  const hexagon = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
  it('Point in Hexagon', () => {
    const point = new Vector2(0.1, 0.5);
    expect(containsHexagon(hexagon, point)).toBeTruthy();
  });
  it('Point in vertex', () => {
    const point = new Vector2(1, 0);
    expect(containsHexagon(hexagon, point)).toBeTruthy();
  });
  it('Point in segment', () => {
    const point = new Vector2(0, Math.sqrt(3) / 2 * 1);
    expect(containsHexagon(hexagon, point)).toBeTruthy();
  });
  it('Point not in Hexagon', () => {
    const point = new Vector2(2, 2);
    expect(containsHexagon(hexagon, point)).toBeFalsy();
  });
});

describe("Hexagon Hexagon", () => {
  const hexagon1 = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 1, 0);
  it('Hexagon in Hexagon', () => {
    const hexagon2 = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 2, 0);
    expect(intersectHexagonHexagon(hexagon1, hexagon2)).toBeTruthy();
  });
  it('Hexagon intersect Hexagon, very close to vertex', () => {
    const hexagon2 = Hexagon.fromCenterLengthAngle(new Vector2(2, 0), 1+1e-10, 0);
    expect(intersectHexagonHexagon(hexagon1, hexagon2)).toBeTruthy();
  });
  it('Hexagon intersect Hexagon', () => {
    const hexagon2 = Hexagon.fromCenterLengthAngle(new Vector2(1, 0), 0.5, 0);
    expect(intersectHexagonHexagon(hexagon1, hexagon2)).toBeTruthy();
  });
  it('Hexagon not in Hexagon', () => {
    const hexagon2 = Hexagon.fromCenterLengthAngle(new Vector2(1, 1), 0.2, 0);
    expect(intersectHexagonHexagon(hexagon1, hexagon2)).toBeFalsy();
  });
});