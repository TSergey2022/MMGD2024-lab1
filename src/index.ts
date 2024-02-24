/* istanbul ignore file */

import AABB from "./aabb";
import Game from "./game";
import { makeRandom } from "./utils";

const countElem = document.getElementById("cnt") as HTMLInputElement;
const canvas = document.getElementById("cnvs") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let game: Game; setup();

function setup() {
  game = new Game(ctx, 15);
  const colliders = makeRandom(
    Number.parseInt(countElem.value),
    new AABB(0, canvas.clientWidth, 0, canvas.clientHeight)
  );
  colliders.forEach(obj => game.insert(obj));
  game.draw(game.ctx);
}

function fastRestartGame() {
  restartGame();
  continueGame();
}

function restartGame() {
  stopGame();
  setup();
}

function stopGame() {
  game.pause();
}

function continueGame() {
  game.continue();
}

function stepGame() {
  game.step(game.lastTick + game.tickLength);
}

function keyPressed(event) {
  const dict = {
    "q": fastRestartGame,
    "w": restartGame,
    "e": stopGame,
    "r": continueGame,
    "t": stepGame
  }
  const key = event.key as string;
  for (const propKey in dict) if (key === propKey) dict[propKey].call();
}

// Add event listener to listen for key press
document.addEventListener("keypress", keyPressed);
document.addEventListener("DOMContentLoaded", () => {
  (document.getElementById("fastrestart") as HTMLButtonElement).addEventListener("click", fastRestartGame);
  (document.getElementById("restart") as HTMLButtonElement).addEventListener("click", restartGame);
  (document.getElementById("stop") as HTMLButtonElement).addEventListener("click", stopGame);
  (document.getElementById("continue") as HTMLButtonElement).addEventListener("click", continueGame);
  (document.getElementById("step") as HTMLButtonElement).addEventListener("click", stepGame);
})