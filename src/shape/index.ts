import AABB from "../aabb";
export type ShapeType = "circle" | "tri" | "hex";

export default class Shape {

  type: ShapeType

  constructor(type: ShapeType) {
    this.type = type;
  }

  center(): Vector2 {
    throw new Error("Shape.center is abstract");
  }

  aabb(): AABB {
    throw new Error("Shape.aabb is abstract");
  }

  clone(): Shape {
    throw new Error("Shape.clone is abstract");
  }

}

import Circle from "./circle";
import Triangle from "./triangle";
import Hexagon from "./hexagon"
import Vector2 from "../vector2";
export { Shape, Circle, Triangle, Hexagon }