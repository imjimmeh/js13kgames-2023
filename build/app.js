"use strict";(()=>{var r=class{constructor({name:t}){this.name=t}};var l=class extends r{constructor(e){super({name:"ControlledBy"});this.controlledBy=e}};var I=(o,t,e)=>(o+(t-o))*e,P=o=>o<1e-5&&o>-1e-5;var h=(o,t,e)=>{let n=I(o.x,t.x,e),s=I(o.y,t.y,e);return{x:n,y:s}},y=(o,t)=>({x:o.x+t.x,y:o.y+t.y}),u=({x:o,y:t})=>P(o)&&P(t);var f=class extends r{constructor({vector:e,speed:n,maxSpeed:s}){super({name:"Movement"});this.vector=e??{x:0,y:0},this.speed=n??{x:0,y:0},this.maxSpeed=s??{x:1,y:1}}updateSpeed(){u(this.vector)?this.speed={x:0,y:0}:this.speed=h(this.speed,y(this.speed,this.vector),.75)}};var x=class extends r{constructor({r:e,g:n,b:s,a:i}){super({name:"Colour"});this.toRgb=()=>`rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;this.r=e,this.g=n,this.b=s,this.a=i,this.toRgb=this.toRgb.bind(this)}};var p="Position",g=class extends r{constructor({x:e,y:n}){super({name:p});this.x=e??0,this.y=n??0}};var v=class extends r{constructor({width:e,height:n}){super({name:"Size"});this.width=e,this.height=n}};function*M(){yield new x({r:255,g:0,b:0,a:255}),yield new g({x:0,y:0}),yield new v({width:200,height:200})}var m=class{getAcceptedEntities(t){return A(t,this)}},A=function*(o,t){for(let e of o)t.accepts(e)&&(yield e)};var b=class extends m{constructor(){super();this.keyStates=new Map;this.init=this.init.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onKeyUp=this.onKeyUp.bind(this)}accepts(e){let n=e.components.get("ControlledBy");return n?n.controlledBy=="Player"&&e.components.has("Movement"):!1}init(){document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp)}update({entities:e}){for(let i of this.keyStates)i[1]=="Pressed"&&this.keyStates.set(i[0],"Held");let n=this.getAxisVector("ArrowLeft","ArrowRight"),s=this.getAxisVector("ArrowUp","ArrowDown");for(let i of this.getAcceptedEntities(e)){let K=i.components.get("Movement");K.vector.y=s,K.vector.x=n}}getAxisVector(e,n){let s=(this.keyStates.get(e)??"Released")!="Released"?1:0,i=(this.keyStates.get(n)??"Released")!="Released"?-1:0;return s+i}onKeyDown(e){this.keyStates.set(e.key,"Pressed")}onKeyUp(e){this.keyStates.set(e.key,"Released")}};var w=class extends m{accepts(t){return t.components.has(p)&&t.components.has("Movement")}init(){}update({entities:t}){for(let e of this.getAcceptedEntities(t)){let n=e.components.get(p),s=e.components.get("Movement");if(console.log(s),u(s.vector))s.speed.x=0,s.speed.y=0;else{let i=h(s.speed,y(s.speed,s.vector),.75);s.speed.x=i.x,s.speed.y=i.y}n.x+=s.speed.x,n.y+=s.speed.y}}};var R=class{constructor(){let t=document.querySelector("canvas");if(!t)throw"Could not find canvas";this._canvas=t,this._context=this._canvas.getContext("2d")}get canvas(){return this._canvas}get context(){return this._context}init(){this._canvas.width=window.innerWidth,this._canvas.height=window.innerHeight}clearCanvas(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}},c=new R;var z=o=>{let t=o.components.get("Size"),e=o.components.get(p),n=o.components.get("Colour");c.context.fillStyle=n.toRgb(),c.context.fillRect(e.x,e.y,t.width,t.height)},C=class extends m{accepts(t){return t.components.has("Size")&&t.components.has(p)&&t.components.has("Colour")}init(){}update({entities:t}){c.clearCanvas();for(let e of this.getAcceptedEntities(t))z(e)}};var E=class{constructor(){this.systems=[];this.entities=[];this.update=this.update.bind(this)}init(){c.init();for(let t of this.entities)t.init();for(let t of this.systems)t.init();window.requestAnimationFrame(this.update)}update(){for(let t of this.systems)t.update({entities:this.entities,systems:this.systems});console.log("ran update"),window.requestAnimationFrame(this.update)}};var S=class{constructor(){this.components=new Map}add(t){this.components.set(t.name,t)}get(t){let e=this.components.get(t);if(e)return e}has(t){return this.components.has(t)}all(){return this.components.values()}};var V=class{constructor(){this.components=new S;this.name=""}init(){for(let t of this.components.all())console.log(t);console.log("initialised",this)}};var a=new V;a.name="Player";for(let o of M())a.components.add(o);a.components.add(new f({}));a.components.add(new l("Player"));var d=new E;d.entities.push(a);d.systems.push(new b);d.systems.push(new w);d.systems.push(new C);d.init();})();
//# sourceMappingURL=app.js.map
