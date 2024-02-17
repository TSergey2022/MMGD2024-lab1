/* istanbul ignore file */

import Vector2 from "./vector2";
import Collider from "./collider";
import { drawCollider } from "./proc/draw";
import { applyGeneralElasticCollision, moveCollider, moveShape } from "./proc/physics";
import { detectCollisions, detectEdgeCollisions } from "./proc/collision";
import AABB from "./aabb";

export default class Game {

  ctx: CanvasRenderingContext2D;

  gameObjects: Array<Collider>;
  lastTick: number;
  lastDraw: number;
  tickLength: number;
  tickCount: number;
  stopCycle: number;

  paused: boolean;

  constructor(ctx: CanvasRenderingContext2D, tickLength: number = 15) {
    this.ctx = ctx;
    this.gameObjects = [];
    this.lastTick = performance.now();
    this.lastDraw = this.lastTick;
    this.tickLength = tickLength;
    this.tickCount = 0;
    this.stopCycle = 0;
    this.paused = true;
  }

  continue() {
    if (this.paused) {
      this.paused = false;
      this.lastTick = performance.now();
      this.run(this.lastTick);
    }
  }

  pause() {
    if (!this.paused) {
      this.paused = true;
      window.cancelAnimationFrame(this.stopCycle);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.gameObjects.forEach(go=>drawCollider(ctx, go));
  }

  run(timeNow: number) {
    if (this.paused) return;
    this.stopCycle = window.requestAnimationFrame((time)=>this.run(time));
    this.step(timeNow);
  }

  step(timeNow: number) {
    while (timeNow - this.tickLength >= this.lastTick) {
      this.lastTick = this.lastTick + this.tickLength;
      this.tickCount += 1;
      this.physicsStep();
    }
    this.draw(this.ctx);
    this.lastDraw = timeNow;
  }

  physicsStep() {
    {
      const markForDelete = new Set<Collider>();

      this.gameObjects.forEach(obj => obj.c = false);
      const pairs = detectCollisions(this.gameObjects);
      pairs.forEach(pair => applyGeneralElasticCollision(...pair));
      pairs.forEach(pair => pair.forEach(obj => {
        obj.c = true;
        obj.l -= 1;
        if (obj.l <= 0) markForDelete.add(obj);
      }))

      markForDelete.forEach(obj => {
        const idx = this.gameObjects.indexOf(obj);
        this.gameObjects.splice(idx, 1);
      })
    }
    {
      const collisions = detectEdgeCollisions(
        this.gameObjects,
        new AABB(0, this.ctx.canvas.clientWidth, 0, this.ctx.canvas.clientHeight)
      )
      for (const obj of collisions.left) {
        obj.v.x = Math.abs(obj.v.x);
        moveShape(obj.s, new Vector2(-obj.s.aabb().minX, 0));
      }
      for (const obj of collisions.right) {
        obj.v.x = -Math.abs(obj.v.x);
        moveShape(obj.s, new Vector2(this.ctx.canvas.clientWidth - obj.s.aabb().maxX, 0));
      }
      for (const obj of collisions.top) {
        obj.v.y = Math.abs(obj.v.y);
        moveShape(obj.s, new Vector2(0, -obj.s.aabb().minY));
      }
      for (const obj of collisions.bottom) {
        obj.v.y = -Math.abs(obj.v.y);
        moveShape(obj.s, new Vector2(0, this.ctx.canvas.clientHeight - obj.s.aabb().maxY));
      }
    }
    this.gameObjects.forEach(moveCollider)
  }

}