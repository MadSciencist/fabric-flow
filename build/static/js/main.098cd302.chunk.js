(this.webpackJsonpmatty=this.webpackJsonpmatty||[]).push([[0],{13:function(t,e,i){},19:function(t,e){},20:function(t,e){},21:function(t,e){},22:function(t,e,i){"use strict";i.r(e);var r=i(1),n=i(2),o=i.n(n),a=i(6),l=i.n(a),s=(i(13),i(3)),c=i(5),d=i(7),h=i(0),f=i(24),b=h.fabric.util.createClass(h.fabric.Group,{type:"node",superType:"node",initialize:function(t){t=t||{};this.label=new h.fabric.Text("Default Node",{fontSize:16,fontFamily:"polestar",fontWeight:500,fill:"rgba(255, 255, 255, 0.8)"});var e=[new h.fabric.Rect({rx:10,ry:10,width:100,height:50,fill:t.fill||"rgba(0, 0, 0, 0.3)",stroke:t.stroke||"rgba(0, 0, 0, 0)",strokeWidth:2}),this.label],i=Object.assign({},t,{id:t.id||Object(f.a)(),width:100,height:50,originX:"left",originY:"top",hasRotatingPoint:!0,hasControls:!0});this.callSuper("initialize",e,i),this.label.set({top:this.label.top+this.label.height/2+4,left:this.label.left+35})},toObject:function(){return h.fabric.util.object.extend(this.callSuper("toObject"),{id:this.get("id")})},_render:function(t){this.callSuper("_render",t)}}),u=h.fabric.util.createClass(h.fabric.Group,{type:"subProcess",superType:"subProcess",children:[],initialize:function(t){t=t||{};this.label=new h.fabric.Text("Default Node",{fontSize:16,fontFamily:"polestar",fontWeight:500,fill:"rgba(0, 0, 0, 0.8)"});var e=[new h.fabric.Rect({rx:10,ry:10,width:300,height:300,fill:t.fill||"rgba(0, 0, 0, 0.3)",stroke:t.stroke||"rgba(255, 0, 0, 0)",strokeWidth:2}),this.label],i=Object.assign({},t,{id:t.id||Object(f.a)(),width:300,height:300,originX:"left",originY:"top",hasRotatingPoint:!0,hasControls:!0});this.callSuper("initialize",e,i),this.label.set({top:this.label.top+this.label.height/2+4,left:this.label.left+35})},toObject:function(){return h.fabric.util.object.extend(this.callSuper("toObject"),{id:this.get("id"),children:this.get("children")})},addChild:function(t){this.children.includes(t)||this.children.push(t)},_render:function(t){this.callSuper("_render",t)}}),g=new b({id:"task1",top:100,left:100,fill:"red",hasControls:!0,hasRotatingPoint:!1}),p=new u({id:"process1",top:200,left:200,stroke:"black",strokeWidth:10,fill:"rgba(0,0,0,0)",hasControls:!0,hasRotatingPoint:!1}),j=function(){var t=Object(n.useRef)(null),e=Object(n.useState)(null),i=Object(d.a)(e,2),o=i[0],a=i[1];Object(n.useEffect)((function(){var t=new h.fabric.Canvas("canvasId",{preserveObjectStacking:!0,width:700,height:700,selection:!0,defaultCursor:"default",backgroundColor:"#f3f3f3"});p.addChild(g),t.add(g),t.add(p),window.node1=g,window.node2=p,window.canvas=t,a(t),t.on({"object:moving":function(i){if("subProcess"===i.target.superType){var r=i.target;if(r.setCoords(),Array.isArray(i.target.children)){var n=r.left-e[r.id].left,o=r.top-e[r.id].top;i.target.children.forEach((function(i){i.left=e[i.id].left+n,i.top=e[i.id].top+o,i.setCoords(),t.bringToFront(i)}))}t.renderAll()}t.forEachObject((function(e){if(e!==i.target&&"subProcess"===e.superType){var r=e;t.bringToFront(i.target);var n=i.target.intersectsWithObject(r)?"red":"black";r._objects[0].set("stroke",n),t.renderAll()}}))},"mouse:down":function(i){var r=t.getObjects();e=r.reduce((function(t,e){return e?Object(c.a)(Object(c.a)({},t),{},Object(s.a)({},e.id,{top:e.top,left:e.left})):t}),{})}});var e={}}),[]);return Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{onClick:function(){var t=o.toObject().objects;console.log(t),console.log(t.map((function(t){return t.id})))},children:"Serialize"}),Object(r.jsx)("div",{ref:t,style:{width:700,height:700,border:"1px solid gray"},children:Object(r.jsx)("canvas",{style:{width:"100%",height:"100%"},id:"canvasId"})})]})},O=function(){return Object(r.jsx)(j,{})};l.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(O,{})}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.098cd302.chunk.js.map