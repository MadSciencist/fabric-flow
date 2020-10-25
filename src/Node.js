import { fabric } from "fabric";
import { v4 } from "uuid";

const Node = fabric.util.createClass(fabric.Group, {
  type: "node",
  superType: "node",
  initialize(options) {
    options = options || {};
    let name = "Default Node";
    this.label = new fabric.Text(name || "Default Node", {
      fontSize: 16,
      fontFamily: "polestar",
      fontWeight: 500,
      fill: "rgba(255, 255, 255, 0.8)",
    });
    const rect = new fabric.Rect({
      rx: 10,
      ry: 10,
      width: 100,
      height: 50,
      fill: options.fill || "rgba(0, 0, 0, 0.3)",
      stroke: options.stroke || "rgba(0, 0, 0, 0)",
      strokeWidth: 2,
    });
    const node = [rect, this.label];
    const option = Object.assign({}, options, {
      id: options.id || v4(),
      width: 100,
      height: 50,
      originX: "left",
      originY: "top",
      hasRotatingPoint: true,
      hasControls: true,
    });

    this.callSuper("initialize", node, option);
    this.label.set({
      top: this.label.top + this.label.height / 2 + 4,
      left: this.label.left + 35,
    });
  },
  toObject() {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      id: this.get("id"),
    });
  },
  _render(ctx) {
    this.callSuper("_render", ctx);
  },
});

const SubProcess = fabric.util.createClass(fabric.Group, {
  type: "subProcess",
  superType: "subProcess",
  children: [],
  initialize(options) {
    options = options || {};
    let name = "Default Node";
    this.label = new fabric.Text(name || "Default Node", {
      fontSize: 16,
      fontFamily: "polestar",
      fontWeight: 500,
      fill: "rgba(0, 0, 0, 0.8)",
    });
    const rect = new fabric.Rect({
      rx: 10,
      ry: 10,
      width: 300,
      height: 300,
      fill: options.fill || "rgba(0, 0, 0, 0.3)",
      stroke: options.stroke || "rgba(255, 0, 0, 0)",
      strokeWidth: 2,
    });
    const node = [rect, this.label];
    const option = Object.assign({}, options, {
      id: options.id || v4(),
      width: 300,
      height: 300,
      originX: "left",
      originY: "top",
      hasRotatingPoint: true,
      hasControls: true,
    });
    this.callSuper("initialize", node, option);
    this.label.set({
      top: this.label.top + this.label.height / 2 + 4,
      left: this.label.left + 35,
    });
  },
  toObject() {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      id: this.get("id"),
      children: this.get("children"),
    });
  },
  addChild(child) {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  },
  _render(ctx) {
    this.callSuper("_render", ctx);
  },
});

export const taskNode = new Node({
  id: "task1",
  top: 100,
  left: 100,
  fill: "red",
  hasControls: true,
  hasRotatingPoint: false,
});

export const groupNode = new SubProcess({
  id: "process1",
  top: 200,
  left: 200,
  //strokeDashArray: [10, 10],
  stroke: "black",
  strokeWidth: 10,
  fill: "rgba(0,0,0,0)",
  hasControls: true,
  hasRotatingPoint: false,
});
