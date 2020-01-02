import { World } from '../js-libs/ecsy.module.js';
import { GameSystem, TransformSystem, CameraSystem, Transform, Scene, MeshSystem, LightSystem, MaterialSystem, Camera, Mesh, Material, MeshTypes, Light, LightTypes } from '../js-libs/ecsy-babylon.module.js';

class Game extends World {
    constructor() {
        super();
    }
    /** Get all Entity instances. */
    get entities() {
        return this["entityManager"]._entities;
    }
    /** Get all System instances. */
    get systems() {
        return this["systemManager"]._systems;
    }
    /** Get GameSystem instance. */
    get gameSystem() {
        return this.getSystem(GameSystem);
    }
    /** Get singleton of Game instance. */
    static instance() {
        this._game || (this._game = new Game());
        return this._game;
    }
    /**
     * Start game with an empty scene.
     * @param canvas Canvas for webgl context
     * @param systems Systems going to used besides GameSystem, TransformSystem and CameraSystem
     */
    start(canvas, systems) {
        this
            .registerSystem(GameSystem)
            .registerSystem(TransformSystem)
            .registerSystem(CameraSystem);
        systems.forEach(system => this.registerSystem(system));
        this.gameSystem.start(canvas);
        return this;
    }
    /** Create an entity with Transform component. */
    createEntity() {
        return super.createEntity().addComponent(Transform);
    }
    /** Create a scene entity. */
    createScene(color) {
        return super.createEntity().addComponent(Scene, { color: color });
    }
    /** Show Babylon.js insepctor */
    showDebugger() {
        this.gameSystem.activeScene.debugLayer.show();
    }
}

// start app by call game instance
const game = Game.instance();
// init game by declare webgl canvas and add component related systems used later
game.start(document.getElementById("renderCanvas"), [MeshSystem, LightSystem, MaterialSystem]);
// add a scene
game.createScene({ clear: "#5B2C6FFF" });
// add a camera, up it to the height of eyes at standing human
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
        .addComponent(Material, { color: { diffuse: box.diffuse } });
    box.x && (entity.getComponent(Transform).position.x = box.x);
    entity.getComponent(Transform).position.y = 0.5;
    box.z && (entity.getComponent(Transform).position.z = box.z);
});
// add a ground with diffuse, specular and bump textures
game.createEntity()
    .addComponent(Mesh, { type: MeshTypes.Ground, options: { width: 8, height: 8 } })
    .addComponent(Material, {
    texture: {
        diffuse: { url: "https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg", uScale: 4, vScale: 4 },
        specular: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg", uScale: 4, vScale: 4 },
        bump: { url: "https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg", uScale: 4, vScale: 4 }
    }
});
// add a greenish point light, make it 1.5x brighter, put it in the up-center of area
const pointlight = game.createEntity().addComponent(Light, { type: LightTypes.Point, color: { diffuse: "#AAFFAA" } });
pointlight.getMutableComponent(Light).intensity = 1.5;
pointlight.getMutableComponent(Transform).position.y = 2;
