import{World as e}from"https://ecsy.io/build/ecsy.module.js";import{GameSystem as t,TransformSystem as s,Transform as o,MeshSystem as n,LightSystem as i,MaterialSystem as r,Camera as a,Mesh as u,Material as m,MeshTypes as d,Light as p}from"../js-libs/ecsy-babylon.module.js";class c extends e{constructor(){super()}get entities(){return this.entityManager._entities}get systems(){return this.systemManager._systems}get gameSystem(){return this.getSystem(t)}static instance(){return this._game||(this._game=new c),this._game}start(e,o){return this.registerSystem(t),this.registerSystem(s),o.forEach(e=>this.registerSystem(e)),this.gameSystem.start(e).addScene("Scene1"),this}createEntity(){return super.createEntity().addComponent(o)}showDebugger(){this.gameSystem.activeScene.debugLayer.show()}}const g=c.instance();window.Game=g,g.start(document.getElementById("renderCanvas"),[n,i,r]),g.createEntity().addComponent(a).getMutableComponent(o).position.y=1.7,[{diffuse:"#E74C3C",z:3},{diffuse:"#3498DB",z:-3},{diffuse:"#27AE60",x:3},{diffuse:"#F1C40F",x:-3}].forEach(e=>{const t=g.createEntity().addComponent(u).addComponent(m,{diffuse:e.diffuse});void 0!==e.x&&(t.getComponent(o).position.x=e.x),void 0!==e.z&&(t.getComponent(o).position.z=e.z)}),g.createEntity().addComponent(u,{type:d.Ground,options:{width:8,height:8}}).addComponent(m,{texture:{diffuse:{url:"https://i0.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-diffuse-1.jpg",uScale:4,vScale:4},specular:{url:"https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-specular-1.jpg",uScale:4,vScale:4},bump:{url:"https://i2.wp.com/www.sharetextures.com/wp-content/uploads/2019/04/wood_parquet_2-normal-1.jpg",uScale:4,vScale:4}}}).getMutableComponent(o).position.y=-.5,g.createEntity().addComponent(p).getMutableComponent(p).direction.y=1;
