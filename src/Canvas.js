import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { SubProcess, Node } from "./Node";
import { v4 } from "uuid";

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

    fabricCanvas.add(
      new Node({
        id: "task1",
        top: 100,
        left: 100,
        fill: "red",
        hasControls: true,
        hasRotatingPoint: false,
      })
    );
    fabricCanvas.add(
      new SubProcess({
        id: "process1",
        top: 200,
        left: 200,
        stroke: "black",
        strokeWidth: 10,
        fill: "rgba(0,0,0,0)",
        hasControls: true,
        hasRotatingPoint: false,
      })
    );

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
          /* start: border color when entering subProcess */
          const subProcess = obj;
          fabricCanvas.bringToFront(ev.target);
          const color = ev.target.intersectsWithObject(subProcess)
            ? "red"
            : "black";
          subProcess._objects[0].set("stroke", color);
          fabricCanvas.renderAll();
          /* end: border color when entering subProcess */

          /* start: remove task from subProcess when not intersecting */
          if (!ev.target.intersectsWithObject(subProcess)) {
            subProcess.removeChild(ev.target);
          }
          /* end: remove task from subProcess when not intersecting */

          /* start: limit task movement withing the group */
          if (
            ev.target.superType === "node" &&
            ev.target.intersectsWithObject(subProcess)
          ) {
            const task = ev.target;

            const topBound = subProcess.top;
            const bottomBound = topBound + subProcess.height;
            const leftBound = subProcess.left;
            const rightBound = leftBound + subProcess.width;

            subProcess.addChild(task);

            task.left = Math.min(
              Math.max(task.left, leftBound),
              rightBound - task.width
            );
            task.top = Math.min(
              Math.max(task.top, topBound),
              bottomBound - task.height
            );
          }
        }
        /* end: remove task from subProcess when not intersecting */
      });
    }
  }, []);

  const handleExport = () => {
    const { objects } = fabricCanvas.toObject();
    const nodes = [];

    const mapObjectToNode = (object) => {
      const node = {
        id: object.id,
        superType: object.superType,
        parentId: object.parentId,
        properties: {
          left: object.left,
          top: object.top,
        },
      };
      if (object.children) {
        node.children = object.children?.map((child) => mapObjectToNode(child));
      }

      return node;
    };

    objects.forEach((object) => {
      if (object.superType === "node" || object.superType === "subProcess") {
        if (!object.parentId) {
          // we care just about top level object - others will be added recursively
          nodes.push(mapObjectToNode(object));
        }
      }
    });

    window.nodes = nodes;
    console.log(nodes);
  };

  const loadSnapshop = () => {
    console.log("loading", window.nodes);
    if (!window.nodes) return;
    fabricCanvas.clear();

    const mapToTask = (node) => {
      let ret = new Node({
        id: node.id,
        top: node.properties.top,
        left: node.properties.left,
        fill: "red",
        parentId: node.parentId,
      });
      fabricCanvas.add(ret);
      fabricCanvas.bringToFront(ret);
      return ret;
    };

    window.nodes.forEach((node) => {
      if (node.superType === "node") {
        mapToTask(node);
      } else if (node.superType === "subProcess") {
        fabricCanvas.add(
          new SubProcess({
            id: node.id,
            top: node.properties.top,
            left: node.properties.left,
            children: node.children.map((x) => mapToTask(x)),
          })
        );
      }
    });
  };

  return (
    <div>
      <button onClick={handleExport}>Serialize</button>
      <button onClick={loadSnapshop}>Load snapshop</button>
      <button
        onClick={() => {
          fabricCanvas.add(
            new Node({
              id: v4(),
              top: 50,
              left: 50,
              fill: "red",
              hasControls: true,
              hasRotatingPoint: false,
            })
          );
        }}
      >
        Add Task
      </button>
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
