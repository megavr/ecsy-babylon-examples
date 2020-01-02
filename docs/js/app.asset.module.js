import{World as t}from"../js-libs/ecsy.module.js";import{GameSystem as e,TransformSystem as o,CameraSystem as n,Transform as s,Scene as a,MeshSystem as r,MaterialSystem as i,LightSystem as p,Camera as m,Mesh as u,Material as c,MeshTypes as l,Light as g}from"../js-libs/ecsy-babylon.module.js";class d extends t{constructor(){super()}get entities(){return this.entityManager._entities}get systems(){return this.systemManager._systems}get gameSystem(){return this.getSystem(e)}static instance(){return this._game||(this._game=new d),this._game}start(t,s){return this.registerSystem(e).registerSystem(o).registerSystem(n),s.forEach(t=>this.registerSystem(t)),this.gameSystem.start(t),this}createEntity(){return super.createEntity().addComponent(s)}createScene(t){return super.createEntity().addComponent(a,{color:t})}showDebugger(){this.gameSystem.activeScene.debugLayer.show()}}const y=d.instance();y.start(document.getElementById("renderCanvas"),[r,i,p]),y.createScene({clear:"#3498DBFF"}),y.createEntity().addComponent(m).getMutableComponent(s).position.y=1.7;const b=y.createEntity().addComponent(u);b.getMutableComponent(s).position.x=-4,b.getMutableComponent(s).position.y=.5,b.getMutableComponent(s).position.z=5;const C=y.createEntity().addComponent(u).addComponent(c,{color:{diffuse:"#F1C40F"}});C.getMutableComponent(s).position.x=-2,C.getMutableComponent(s).position.y=.5,C.getMutableComponent(s).position.z=5;const h=y.createEntity().addComponent(u,{type:l.Url,url:"https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/Rabbit.babylon"});h.getMutableComponent(s).position.z=5,h.getMutableComponent(s).rotation.y=180,h.getMutableComponent(s).scale.x=.05,h.getMutableComponent(s).scale.y=.05,h.getMutableComponent(s).scale.z=.05;const w=y.createEntity().addComponent(u,{type:l.Url,url:"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf"});w.getMutableComponent(s).position.x=2,w.getMutableComponent(s).position.z=5;const M=y.createEntity().addComponent(u,{type:l.Url,url:"https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/scenes/StanfordBunny.mtl"});M.getMutableComponent(s).position.x=4,M.getMutableComponent(s).position.y=1,M.getMutableComponent(s).position.z=5,y.createEntity().addComponent(u,{type:l.Ground,options:{width:12,height:12}}).addComponent(c,{texture:{diffuse:{url:"https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg",uScale:6,vScale:6},specular:{url:"https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg",uScale:6,vScale:6},bump:{url:"https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg",uScale:6,vScale:6}}});const S=y.createEntity().addComponent(g);S.getMutableComponent(g).direction.y=2,S.getMutableComponent(g).intensity=2,window.game=y;
