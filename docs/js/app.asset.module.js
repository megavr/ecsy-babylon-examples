import{World as t}from"https://ecsy.io/build/ecsy.module.js";import{GameSystem as e,TransformSystem as s,Transform as n,MeshSystem as a,LightSystem as o,AssetSystem as r,Camera as i,Asset as m,Light as y}from"../js-libs/ecsy-babylon.module.js";class c extends t{constructor(){super()}get entities(){return this.entityManager._entities}get systems(){return this.systemManager._systems}get gameSystem(){return this.getSystem(e)}static instance(){return this._game||(this._game=new c),this._game}start(t,n){return this.registerSystem(e),this.registerSystem(s),n.forEach(t=>this.registerSystem(t)),this.gameSystem.start(t).addScene("Scene1"),this}createEntity(){return super.createEntity().addComponent(n)}showDebugger(){this.gameSystem.activeScene.debugLayer.show()}}const g=c.instance();window.Game=g,g.start(document.getElementById("renderCanvas"),[a,o,r]),g.createEntity().addComponent(i).getMutableComponent(n).position.y=1.7;const u=g.createEntity().addComponent(m,{url:"https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/Rabbit.babylon"});u.getMutableComponent(n).position.z=5,u.getMutableComponent(n).rotation.y=180,u.getMutableComponent(n).scale.x=.05,u.getMutableComponent(n).scale.y=.05,u.getMutableComponent(n).scale.z=.05,g.createEntity().addComponent(y).getMutableComponent(y).direction.y=1;
