import { Game } from "./core/Game";
import { MeshSystem, LightSystem, MaterialSystem, InputSystem, Camera, Mesh, MeshTypes, Material, Transform, Light, Input } from "@megavr/ecsy-babylon";

// start app by call game instance
const game = Game.instance();

// init game canvas, add systems, add scene T
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, MaterialSystem, InputSystem])

// add sceneT
const sceneT = game.createScene({ clear: "#9A7D0AFF" });

// create camera of scene T
const cameraT = game.createEntity().addComponent(Camera, { scene: sceneT });
cameraT.getMutableComponent(Transform).position.y = 1.7;

// create a ball in scene T can be moved by WASD
const ballT = game.createEntity()
  .addComponent(Mesh, { scene: sceneT, type: MeshTypes.Sphere })
  .addComponent(Material, { scene: sceneT, color: { diffuse: "#E74C3C" } });
ballT.getMutableComponent(Transform).position.y = 0.5;
ballT.getMutableComponent(Transform).position.z = 2;

// create light of scene T
const lightT = game.createEntity().addComponent(Light, { scene: sceneT });
lightT.getMutableComponent(Light).direction.y = 1;

// create tiger skin texture ground for scene T
game.createEntity()
  .addComponent(Mesh, { scene: sceneT, type: MeshTypes.Ground, options: { width: 10, height: 10 } })
  .addComponent(Material, {
    scene: sceneT,
    texture: {
      diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-diffuse-.jpg?ssl=1", uScale: 5, vScale: 5 },
      bump: { url: "https://i1.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-normal-.jpg?ssl=1", uScale: 5, vScale: 5 },
      specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-specular-.jpg?ssl=1", uScale: 5, vScale: 5 }
    }
  });

// create input for scene T and bind onKey function
game.createEntity().addComponent(Input, { scene: sceneT, onKey: onKeyT });

// add sceneZ
const sceneZ = game.createScene({ clear: "#4D5656FF" });

// create camera of scene Z
const cameraZ = game.createEntity().addComponent(Camera, { scene: sceneZ, pointerLock: true });
cameraZ.getMutableComponent(Transform).position.y = 1.7;

// create a box in scene Z can be moved by WASD
const boxZ = game.createEntity()
  .addComponent(Mesh, { scene: sceneZ })
  .addComponent(Material, { scene: sceneZ, color: { diffuse: "#3498DB" } });
boxZ.getMutableComponent(Transform).position.y = 0.5;
boxZ.getMutableComponent(Transform).position.z = 2;

// create light of scene Z
const lightB = game.createEntity().addComponent(Light, { scene: sceneZ });
lightB.getMutableComponent(Light).direction.y = 1;

// create zebra skin texture ground for scene T
game.createEntity()
  .addComponent(Mesh, { scene: sceneZ, type: MeshTypes.Ground, options: { width: 10, height: 10 } })
  .addComponent(Material, {
    scene: sceneZ,
    texture: {
      diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-diffuse.jpg?ssl=1", uScale: 5, vScale: 5 },
      bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-normal.jpg?ssl=1", uScale: 5, vScale: 5 },
      specular: { url: "https://i1.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-specular.jpg?ssl=1", uScale: 5, vScale: 5 }
    }
  });

// create input for scene Z and bind onKey function
game.createEntity().addComponent(Input, { scene: sceneZ, onKey: onKeyZ });

function onKeyZ(key: string, down: boolean) {
  if (down) {
    switch (key) {
      case "t":
      case "T":
        game.gameSystem.switchScene(sceneT);
        break;
      case "w":
      case "W":
        boxZ.getMutableComponent(Transform).position.z += 0.1;
        break;
      case "a":
      case "A":
        boxZ.getMutableComponent(Transform).position.x -= 0.1;
        break;
      case "s":
      case "S":
        boxZ.getMutableComponent(Transform).position.z -= 0.1;
        break;
      case "d":
      case "D":
        boxZ.getMutableComponent(Transform).position.x += 0.1;
        break;
    }
  }
}

function onKeyT(key: string, down: boolean) {
  if (down) {
    switch (key) {
      case "z":
      case "Z":
        game.gameSystem.switchScene(sceneZ);
        break;
      case "w":
      case "W":
        ballT.getMutableComponent(Transform).position.z += 0.1;
        break;
      case "a":
      case "A":
        ballT.getMutableComponent(Transform).position.x -= 0.1;
        break;
      case "s":
      case "S":
        ballT.getMutableComponent(Transform).position.z -= 0.1;
        break;
      case "d":
      case "D":
        ballT.getMutableComponent(Transform).position.x += 0.1;
        break;
    }
  }
}

declare global { interface Window { game: Game; } }
window.game = game;