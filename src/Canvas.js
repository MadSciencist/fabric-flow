import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { groupNode, taskNode } from "./Node";

const Canvas = () => {
  const containerRef = useRef(null);
  const [fabricCanvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvasOption = {
      preserveObjectStacking: true,
      width: 700,
      height: 700,
      selection: true,
      defaultCursor: "default",
      backgroundColor: "#f3f3f3",
    };

    const fabricCanvas = new fabric.Canvas("canvasId", canvasOption);

    groupNode.addChild(taskNode);
    fabricCanvas.add(taskNode);
    fabricCanvas.add(groupNode);

    window.node1 = taskNode;
    window.node2 = groupNode;

    window.canvas = fabricCanvas;
    setCanvas(fabricCanvas);

    fabricCanvas.on({
      "object:moving": onChange,
      "mouse:down": mouseDown,
    });

    let vals = {};

    function mouseDown(ev) {
      const objects = fabricCanvas.getObjects();
      vals = objects.reduce((prev, curr) => {
        return curr
          ? { ...prev, [curr.id]: { top: curr.top, left: curr.left } }
          : prev;
      }, {});
    }

    function onChange(ev) {
      if (ev.target.superType === "subProcess") {
        const subProcess = ev.target;
        subProcess.setCoords();
        if (Array.isArray(ev.target.children)) {
          const offX = subProcess.left - vals[subProcess.id].left;
          const offY = subProcess.top - vals[subProcess.id].top;
          ev.target.children.forEach((child) => {
            child.left = vals[child.id].left + offX;
            child.top = vals[child.id].top + offY;
            child.setCoords();
            fabricCanvas.bringToFront(child);
          });
        }
        fabricCanvas.renderAll();
      }

      fabricCanvas.forEachObject(function (obj) {
        if (obj === ev.target) return;
        if (obj.superType === "subProcess") {
          const subProcess = obj;
          fabricCanvas.bringToFront(ev.target);
          const color = ev.target.intersectsWithObject(subProcess)
            ? "red"
            : "black";
          subProcess._objects[0].set("stroke", color);
          fabricCanvas.renderAll();
        }
      });
    }
  }, []);

  const handleExport = () => {
    const obj = fabricCanvas.toObject().objects;
    console.log(obj);
    console.log(obj.map((x) => x.id));
  };

  return (
    <div>
      <button onClick={handleExport}>Serialize</button>
      <div
        ref={containerRef}
        style={{ width: 700, height: 700, border: "1px solid gray" }}
      >
        <canvas style={{ width: "100%", height: "100%" }} id={`canvasId`} />
      </div>
    </div>
  );
};

export default Canvas;
