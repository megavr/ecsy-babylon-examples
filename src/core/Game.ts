import { Entity, World } from "ecsy";
import { GameSystem, Transform, TransformSystem } from "@megavr/ecsy-babylon";

export class Game extends World {
  private static _game: Game;

  public get entities() {
    return (this as any)["entityManager"]._entities;
  }

  public get systems() {
    return (this as any)["systemManager"]._systems;
  }

  public get gameSystem() {
    return this.getSystem(GameSystem) as GameSystem;
  }

  private constructor() {
    super();
  }

  public static instance(): Game {
    this._game || (this._game = new Game());
    return this._game;
  }

  /**
   * Start an empty game.
   * @param canvas Canvas for webgl context
   * @param systems Systems your game will use besides GameSystem and TransformSystem
   */
  public start(canvas: HTMLCanvasElement, systems: any[]): Game {
    this.registerSystem(GameSystem);
    this.registerSystem(TransformSystem);
    systems.forEach(system => this.registerSystem((system as any)));
    this.gameSystem.start(canvas).addScene("Scene1");
    return this;
  }

  /**
   * Create an entity with Transform component.
   */
  public createEntity(): Entity {
    return super.createEntity().addComponent(Transform);
  }

  public showDebugger() {
    this.gameSystem.activeScene.debugLayer.show();
  }
}