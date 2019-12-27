import { Game } from "./core/Game";
import { MeshSystem, LightSystem, MaterialSystem, ParticleSystem, Camera, Transform, Light, LightTypes, Mesh, MeshTypes, Material, Particle } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// init game by declare webgl canvas and add component related systems used later
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, MaterialSystem, ParticleSystem]);

// add a scene
game.createScene({ clear: "#17202AFF" });

// add a camera, up it to the height of eyes at standing human
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a particle with particle texture, by default it produce 100 units from (0,0,0) to (10,10,10) 
game.createEntity().addComponent(Particle, {
  texture: {
    particle: { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/assets/particles/textures/explosion/Flare.png" }
  }
});

// add a ground with textures, to better check particle area from (0,0,0) to (10,10,0) 
const ground = game.createEntity()
  .addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 10, height: 10 } })
  .addComponent(Material, {
    texture: {
      diffuse: { url: "https://i1.wp.com/www.sharetextures.com/wp-content/uploads/2018/10/PBR-tactile_paving.jpg-diffuse-.jpg?ssl=1", uScale: 5, vScale: 5 },
      bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2018/10/PBR-tactile_paving.jpg-normal-.jpg?ssl=1", uScale: 5, vScale: 5 },
      specular: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2018/10/PBR-tactile_paving.jpg-specular-.jpg?ssl=1", uScale: 5, vScale: 5 }
    }
  });
ground.getMutableComponent(Transform).position.x = 5;
ground.getMutableComponent(Transform).position.z = 5;

// add a front & side walls with textures, to better check particle area from (0,0,0) to (10,10,10)
[
  { x: 5, y: 5, z: 10 },
  { x: 10, y: 5, z: 5, ry: 90 }
].forEach(plane => {
  const entity = game.createEntity()
    .addComponent(Mesh, { type: MeshTypes.Plane, options: { width: 10, height: 10 } })
    .addComponent(Material, {
      texture: {
        diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/brick_wall_5-diffuse.jpg?ssl=1" },
        bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/brick_wall_5-normal.jpg?ssl=1" },
        specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/brick_wall_5-specular.jpg?ssl=1" }
      }
    });
  plane.x && (entity.getMutableComponent(Transform).position.x = plane.x);
  plane.y && (entity.getMutableComponent(Transform).position.y = plane.y);
  plane.z && (entity.getMutableComponent(Transform).position.z = plane.z);
  plane.ry && (entity.getMutableComponent(Transform).rotation.y = plane.ry);
});

// add a point light, put it in the center of area
const pointlight = game.createEntity().addComponent(Light, { type: LightTypes.Point });
pointlight.getMutableComponent(Transform).position.x = 5;
pointlight.getMutableComponent(Transform).position.y = 5;
pointlight.getMutableComponent(Transform).position.z = 5;