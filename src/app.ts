import { Game } from "./core/Game";
import { MeshSystem, LightSystem, Camera, Mesh, Transform, Light } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// put game in window context for better debugging
declare global { interface Window { Game: Game; } }
window.Game = game;

// init game by declare webgl canvas and add systems will be used
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem]);

// add a camera
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a box, move it in front of camera
const box = game.createEntity().addComponent(Mesh);
box.getMutableComponent(Transform).position.z = 3;

// add hemisphric light
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 1;