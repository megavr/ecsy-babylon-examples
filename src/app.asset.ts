import { Game } from "./core/Game";
import { MeshSystem, LightSystem, AssetSystem, Camera, Transform, Light, Asset } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// put game in window context for better debugging
declare global { interface Window { Game: Game; } }
window.Game = game;

// init game by declare webgl canvas and add systems will be used
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, AssetSystem]);

// add a camera
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a babylon scene/model
const model = game.createEntity().addComponent(Asset, { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/Rabbit.babylon" });
model.getMutableComponent(Transform).position.z = 5;
model.getMutableComponent(Transform).rotation.y = 180;
model.getMutableComponent(Transform).scale.x = 0.05;
model.getMutableComponent(Transform).scale.y = 0.05;
model.getMutableComponent(Transform).scale.z = 0.05;

// add hemisphric light
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 1;