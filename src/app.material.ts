import { Game } from "./core/Game";
import { MeshSystem, LightSystem, MaterialSystem, Camera, Mesh, MeshTypes, Transform, Light, Material } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// put game in window context for better debugging
declare global { interface Window { Game: Game; } }
window.Game = game;

// init game by declare webgl canvas and add systems will be used
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, MaterialSystem]);

// add a camera
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add 4 boxes of different colors around the camera
[
  { diffuse: "#E74C3C", z: 3 },
  { diffuse: "#3498DB", z: -3 },
  { diffuse: "#27AE60", x: 3 },
  { diffuse: "#F1C40F", x: -3 }
].forEach(box => {
  const entity = game.createEntity()
    .addComponent(Mesh)
    .addComponent(Material, { diffuse: box.diffuse });
  box.x !== undefined && (entity.getComponent(Transform).position.x = box.x);
  box.z !== undefined && (entity.getComponent(Transform).position.z = box.z);
});

// add a ground with diffuse, specular and bump texture
const ground = game.createEntity()
  .addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 8, height: 8 } })
  .addComponent(Material, {
    texture: {
      diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg", uScale: 4, vScale: 4 },
      specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg", uScale: 4, vScale: 4 },
      bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg", uScale: 4, vScale: 4 }
    }
  });

ground.getMutableComponent(Transform).position.y = -0.5;

// add hemisphric light
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 1;