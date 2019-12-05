import { Game } from "./core/Game";
import { MeshSystem, LightSystem, AssetSystem, Camera, Transform, Light, Asset } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// init game by declare webgl canvas and add component related systems used later
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, AssetSystem]);

// add a camera, up it to the height of eyes at standing human
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a babylon scene/model, make transformation visually good for camera 
const model = game.createEntity()
  .addComponent(Asset, { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/Rabbit.babylon" });
model.getMutableComponent(Transform).position.z = 5;
model.getMutableComponent(Transform).rotation.y = 180;
model.getMutableComponent(Transform).scale.x = 0.05;
model.getMutableComponent(Transform).scale.y = 0.05;
model.getMutableComponent(Transform).scale.z = 0.05;

// add a hemisphric light, up light to 2 unit higher, make it 2x brighter
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 2;
hemilight.getMutableComponent(Light).intensity = 2;