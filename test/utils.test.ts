import { distToSegment, getRandomNormalizedVector } from "../src/utils";
import Vector2 from "../src/vector2";

describe('getRandomNormalizedVector', () => {

  it('Vector should be normalized', () => {
    const vector2 = getRandomNormalizedVector();
    expect(vector2.length()).toBeCloseTo(1);
  });
});

describe('distToSegment', () => {
  const v = new Vector2(-1, 0);
  const w = new Vector2(2, 3);
  it('Point not in norm verctor', () => {
    const point = new Vector2(3, 3);
    expect(distToSegment(point, v, w)).toBeCloseTo(1);
  });
  it('Point in norm verctor', () => {
    const point = new Vector2(0, 0);
    expect(distToSegment(point, v, w)).toBeCloseTo(Math.sqrt(2) / 2);
  });
  it('Point is segment point', () => {
    expect(distToSegment(v, v, w)).toBeCloseTo(0);
  });
  it('Point in segment', () => {
    const point = new Vector2(0, 1);
    expect(distToSegment(point, v, w)).toBeCloseTo(0);
  });
  it('Segment is point', () => {
    const point = new Vector2(0, 0);
    expect(distToSegment(point, v, v)).toBeCloseTo(1);
  });
});