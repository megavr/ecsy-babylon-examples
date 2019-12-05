import { Game } from "./core/Game";
import { MeshSystem, LightSystem, MaterialSystem, InputSystem, Camera, Mesh, MeshTypes, Material, Transform, Light, Input, InputTypes } from "@megavr/ecsy-babylon";

enum Scenes {
  T = "TigerRoom",
  Z = "ZebraRoom"
}

// start app by call game instance
const game = Game.instance();

// init game canvas, add systems, add scene T
game.start(document.getElementById("renderCanvas") as HTMLCanvasElement, [MeshSystem, LightSystem, MaterialSystem, InputSystem], Scenes.T)

// create camera of scene T
const cameraT = game.createEntity().addComponent(Camera, { sceneName: Scenes.T });
cameraT.getMutableComponent(Transform).position.y = 1.7;

// create light of scene T
const lightT = game.createEntity().addComponent(Light, { sceneName: Scenes.T });
lightT.getMutableComponent(Light).direction.y = 1;

// create tiger skin texture ground for scene T
game.createEntity()
  .addComponent(Mesh, { sceneName: Scenes.T, type: MeshTypes.Ground, options: { width: 10, height: 10 } })
  .addComponent(Material, {
    sceneName: Scenes.T,
    texture: {
      diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-diffuse-.jpg?ssl=1", uScale: 5, vScale: 5 },
      bump: { url: "https://i1.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-normal-.jpg?ssl=1", uScale: 5, vScale: 5 },
      specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/PBR-Leopard_skin-specular-.jpg?ssl=1", uScale: 5, vScale: 5 }
    }
  });

// create input for scene T and bind onKey function
game.createEntity().addComponent(Input, { sceneName: Scenes.T, type: InputTypes.Keyboard, onKey: onKey });

// add scene Z
game.gameSystem.addScene(Scenes.Z);

// create camera of scene Z
const cameraZ = game.createEntity().addComponent(Camera, { sceneName: Scenes.Z });
cameraZ.getMutableComponent(Transform).position.y = 1.7;

// create light of scene Z
const lightB = game.createEntity().addComponent(Light, { sceneName: Scenes.Z });
lightB.getMutableComponent(Light).direction.y = 1;

// create zebra skin texture ground for scene T
game.createEntity()
  .addComponent(Mesh, { sceneName: Scenes.Z, type: MeshTypes.Ground, options: { width: 10, height: 10 } })
  .addComponent(Material, {
    sceneName: Scenes.Z,
    texture: {
      diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-diffuse.jpg?ssl=1", uScale: 5, vScale: 5 },
      bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-normal.jpg?ssl=1", uScale: 5, vScale: 5 },
      specular: { url: "https://i1.wp.com/www.sharetextures.com/wp-content/uploads/2018/09/zebra_skin.jpg-specular.jpg?ssl=1", uScale: 5, vScale: 5 }
    }
  });

// create input for scene Z and bind onKey function
game.createEntity().addComponent(Input, { sceneName: Scenes.Z, type: InputTypes.Keyboard, onKey: onKey });

function onKey(key: string, down: boolean) {
  if (down) {
    if (key === "t" && game.gameSystem.activeSceneName !== Scenes.T) {
      game.gameSystem.switchScene(Scenes.T, cameraT);
    } else if (key === "z" && game.gameSystem.activeSceneName !== Scenes.Z) {
      game.gameSystem.switchScene(Scenes.Z, cameraZ);
    }
  }
}