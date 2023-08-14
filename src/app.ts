import { Game } from "./core/game";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const game = new Game(canvas);

game.init();

window.requestAnimationFrame(game.loop);
