import Shape, { Circle, Hexagon, Triangle } from "../../src/shape";
import Vector2 from "../../src/vector2";

describe("Virtual methods test", () => {
  
  it('Shapes should throw errors in virtual methods', () => {
    const shape = new Shape("tri");
    expect(()=>shape.center()).toThrow();
    expect(()=>shape.aabb()).toThrow();
    expect(()=>shape.clone()).toThrow();
  });

  it('All child have implemented methods', () => {
    const circle = new Circle(new Vector2(10, -2), 3);
    const tri = Triangle.fromCenterLengthAngle(new Vector2(-3, 3), 5, 0);
    const hex = Hexagon.fromCenterLengthAngle(new Vector2(9, 12), 7, 0);
    const shapes = [circle, tri, hex];
    for (const shape of shapes) {
      expect(()=>shape.center()).not.toThrow();
      expect(()=>shape.aabb()).not.toThrow();
      expect(()=>shape.clone()).not.toThrow();
    }
  });

});