import { Game } from "./core/Game";
import { MeshSystem, LightSystem, Camera, Mesh, Transform, Light } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// init game by declare webgl canvas and add component related systems used later
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem]);

// add a camera, up it to the height of eyes at standing human
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a box, move it in front of camera, rotate clockwise 45 degrees and make it 2x higher
const box = game.createEntity().addComponent(Mesh);
box.getMutableComponent(Transform).position.z = 3;
box.getMutableComponent(Transform).rotation.y = 45;
box.getMutableComponent(Transform).scale.y = 2;

// add a hemisphric light, up light to 1 unit higher
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 1;

declare global { interface Window { game: Game; } }
window.game = game;