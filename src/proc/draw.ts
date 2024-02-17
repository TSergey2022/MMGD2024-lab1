/* istanbul ignore file */

import Collider from "../collider";
import Shape, { Circle, Hexagon, Triangle } from "../shape";

export function drawCircle(ctx: CanvasRenderingContext2D, c: Circle, fill: boolean = false) {
  ctx.beginPath();
  ctx.arc(c.c.x, c.c.y, c.r, 0, Math.PI * 2);
  if (fill) ctx.fill(); else ctx.stroke();
}

export function drawTriangle(ctx: CanvasRenderingContext2D, t: Triangle, fill: boolean = false) {
  ctx.beginPath();
  ctx.moveTo(t.v.v1.x, t.v.v1.y);
  ctx.lineTo(t.v.v2.x, t.v.v2.y);
  ctx.lineTo(t.v.v3.x, t.v.v3.y);
  ctx.closePath();
  if (fill) ctx.fill(); else ctx.stroke();
}

export function drawHexagon(ctx: CanvasRenderingContext2D, h: Hexagon, fill: boolean = false) {
  ctx.beginPath();
  ctx.moveTo(h.v.t1.v.v1.x, h.v.t1.v.v1.y);
  ctx.lineTo(h.v.t2.v.v1.x, h.v.t2.v.v1.y);
  ctx.lineTo(h.v.t3.v.v1.x, h.v.t3.v.v1.y);
  ctx.lineTo(h.v.t4.v.v1.x, h.v.t4.v.v1.y);
  ctx.lineTo(h.v.t5.v.v1.x, h.v.t5.v.v1.y);
  ctx.lineTo(h.v.t6.v.v1.x, h.v.t6.v.v1.y);
  ctx.closePath();
  if (fill) ctx.fill(); else ctx.stroke();
}

export function drawShape(ctx: CanvasRenderingContext2D, s: Shape, fill: boolean = false) {
  if (s.type === "circle") drawCircle(ctx, s as Circle, fill);
  else if (s.type === "tri") drawTriangle(ctx, s as Triangle, fill);
  else if (s.type === "hex") drawHexagon(ctx, s as Hexagon, fill);
  else throw new Error("drawShape out of range");
}

export function getColorByLife(life: number): string {
  if (life === 1) return "#A51D2D";
  else if (life === 2) return "#E5A50A";
  else if (life === 3) return "#26A269";
  else return "#000000"
}

export function drawCollider(ctx: CanvasRenderingContext2D, c: Collider) {
  ctx.save();
  ctx.fillStyle = getColorByLife(c.l);
  drawShape(ctx, c.s, !c.c);
  ctx.restore();
}