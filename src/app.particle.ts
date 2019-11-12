import { Game } from "./core/Game";
import { MeshSystem, LightSystem, MaterialSystem, ParticleSystem, Camera, Transform, Light, Particle } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// put game in window context for better debugging
declare global { interface Window { Game: Game; } }
window.Game = game;

// init game by declare webgl canvas and add systems will be used
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, MaterialSystem, ParticleSystem]);

// add a camera
const camera = game.createEntity().addComponent(Camera);
camera.getMutableComponent(Transform).position.y = 1.7;

// add a particle
const particle = game.createEntity()
  .addComponent(Particle, {
    emitter: { x: 0, y: 0, z: 1 },
    texture: {
      particle: { url: "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/assets/particles/textures/explosion/Flare.png" }
    }
  });

particle.getMutableComponent(Transform).position.z = 3;

// add hemisphric light
const hemilight = game.createEntity().addComponent(Light);
hemilight.getMutableComponent(Light).direction.y = 1;