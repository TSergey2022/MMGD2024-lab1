/* istanbul ignore file */

import Game from "./game";
import { makeCircleOfColliders } from "./utils";
import Vector2 from "./vector2";

const canvas = document.getElementById("cnvs") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let game: Game; setup();

function setup() {
  game = new Game(ctx, 15);
  makeCircleOfColliders(game, new Vector2(canvas.clientWidth / 2, canvas.clientHeight / 2), 200, 30);
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
    "1": fastRestartGame,
    "2": restartGame,
    "3": stopGame,
    "4": continueGame,
    "5": stepGame
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