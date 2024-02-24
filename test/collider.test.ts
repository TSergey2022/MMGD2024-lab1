import Collider from "../src/collider";
import { Circle, Hexagon, Triangle } from "../src/shape";
import Vector2 from "../src/vector2";

describe("Clone test", () => {

  it('Shape and Velocity is ref, life and colliding flag is value', () => {
    const circle = new Circle(new Vector2(10, -2), 3);
    const tri = Triangle.fromCenterLengthAngle(new Vector2(-3, 3), 5, 0);
    const hex = Hexagon.fromCenterLengthAngle(new Vector2(9, 12), 7, 0);
    const colliders = [circle, tri, hex].map((s, i) => new Collider(s, new Vector2(0, i), i*2, i%2==0))
    for (const collider of colliders) {
      expect(()=>{
        const clone = collider.clone();
        expect(clone.s === collider.s).not.toBeTruthy();
        expect(clone.v === collider.v).not.toBeTruthy();
        expect(clone.l === collider.l).toBeTruthy();
        expect(clone.c === collider.c).toBeTruthy();
      }).not.toThrow();
    }
  });

});