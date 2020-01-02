import { Game } from "./core/Game";
import { MeshSystem, MaterialSystem, LightSystem, Camera, Transform, Mesh, Material, Light, MeshTypes } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// init game by declare webgl canvas and add component related systems used later
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, MaterialSystem, LightSystem]);

// add a scene
game.createScene({ clear: "#3498DBFF" });

// add a camera, up it to the height of eyes at standing human
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a box
const box = game.createEntity().addComponent(Mesh);
box.getMutableComponent(Transform).position.x = -4;
box.getMutableComponent(Transform).position.y = 0.5;
box.getMutableComponent(Transform).position.z = 5;

// add a box with material
const boxMat = game.createEntity().addComponent(Mesh).addComponent(Material, { color: { diffuse: "#F1C40F" } });
boxMat.getMutableComponent(Transform).position.x = -2;
boxMat.getMutableComponent(Transform).position.y = 0.5;
boxMat.getMutableComponent(Transform).position.z = 5;

// load a babylon model 
const babylon = game.createEntity().addComponent(Mesh, {
  type: MeshTypes.Url,
  url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/Rabbit.babylon"
});
babylon.getMutableComponent(Transform).position.z = 5;
babylon.getMutableComponent(Transform).rotation.y = 180;
babylon.getMutableComponent(Transform).scale.x = 0.05;
babylon.getMutableComponent(Transform).scale.y = 0.05;
babylon.getMutableComponent(Transform).scale.z = 0.05;

// load a gltf model
const gltf = game.createEntity().addComponent(Mesh, {
  type: MeshTypes.Url,
  url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"
});
gltf.getMutableComponent(Transform).position.x = 2;
gltf.getMutableComponent(Transform).position.z = 5;

// load a unsupported format
const unsupported = game.createEntity().addComponent(Mesh, {
  type: MeshTypes.Url,
  url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/StanfordBunny.mtl"
});
unsupported.getMutableComponent(Transform).position.x = 4;
unsupported.getMutableComponent(Transform).position.y = 1;
unsupported.getMutableComponent(Transform).position.z = 5;

// add a ground with diffuse, specular and bump textures
game.createEntity().addComponent(Mesh, {
  type: MeshTypes.Ground,
  options: { width: 12, height: 12 }
}).addComponent(Material, {
  texture: {
    diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg", uScale: 6, vScale: 6 },
    specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg", uScale: 6, vScale: 6 },
    bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg", uScale: 6, vScale: 6 }
  }
});

// add a hemisphric light, up light to 2 unit higher, make it 2x brighter
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 2;
hemilight.getMutableComponent(Light).intensity = 2;

declare global { interface Window { game: Game; } }
window.game = game;