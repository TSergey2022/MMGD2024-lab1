import Collider from "../../src/collider";
import { moveCircle, moveCollider, moveHexagon, moveTriangle } from "../../src/proc/physics";
import { Circle, Hexagon, Triangle } from "../../src/shape";
import Vector2 from "../../src/vector2";


describe("General physics test", () => {

  const epsDigits = 8;

  it('Circle move', () => {
    const startCircle = new Circle(new Vector2(0, 0), 10);
    const velocity = new Vector2(1, 0);
    const endCircle = new Circle(startCircle.c.add(velocity), 10);
    const startCollider = new Collider(startCircle.clone(), velocity, 1);
    const collider = startCollider.clone();

    moveCircle(startCircle, velocity);
    expect(startCircle.center().x).toBeCloseTo(endCircle.center().x, epsDigits);
    expect(startCircle.center().y).toBeCloseTo(endCircle.center().y, epsDigits);

    moveCollider(collider);
    expect(collider.s.center().x).toBeCloseTo(endCircle.center().x, epsDigits);
    expect(collider.s.center().y).toBeCloseTo(endCircle.center().y, epsDigits);
  });

  it('Triangle move', () => {
    const velocity = new Vector2(1, 0);
    const start = Triangle.fromCenterLengthAngle(new Vector2(0, 0), 2, 0);
    const end = Triangle.fromCenterLengthAngle(start.center().add_(velocity), 2, 0);
    const collider = new Collider(start.clone(), velocity, 1);

    moveTriangle(start, velocity);
    expect(start.center().x).toBeCloseTo(start.center().x, epsDigits);
    expect(start.center().y).toBeCloseTo(start.center().y, epsDigits);

    moveCollider(collider);
    expect(collider.s.center().x).toBeCloseTo(end.center().x, epsDigits);
    expect(collider.s.center().y).toBeCloseTo(end.center().y, epsDigits);
  });

  it('Hexagon move', () => {
    const velocity = new Vector2(1, 0);
    const start = Hexagon.fromCenterLengthAngle(new Vector2(0, 0), 2, 0);
    const end = Hexagon.fromCenterLengthAngle(start.center().add_(velocity), 2, 0);
    const collider = new Collider(start.clone(), velocity, 1);

    moveHexagon(start, velocity);
    expect(start.center().x).toBeCloseTo(start.center().x, epsDigits);
    expect(start.center().y).toBeCloseTo(start.center().y, epsDigits);

    moveCollider(collider);
    expect(collider.s.center().x).toBeCloseTo(end.center().x, epsDigits);
    expect(collider.s.center().y).toBeCloseTo(end.center().y, epsDigits);
  });

});