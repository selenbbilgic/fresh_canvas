import React, { useState, useEffect } from "react";

const MyCanvasComponent = () => {
  // State variables for panning and zooming
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Constants for zooming
  const zoomFactor = 1.01;
  const minZoom = 0.6;
  const maxZoom = 3;

  // Function to draw the grid
  const drawGrid = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 2;

    // calculate the number of lines to draw based on the zoom level
    const numLines = Math.ceil(
      Math.max(ctx.canvas.width, ctx.canvas.height) / (5 * zoom)
    );

    // draw vertical lines
    for (let i = -numLines; i <= numLines; i++) {
      const x = (panX % (15 * zoom)) + i * 15 * zoom;
      ctx.moveTo(x, -ctx.canvas.height);
      ctx.lineTo(x, ctx.canvas.height);
    }

    // draw horizontal lines
    for (let i = -numLines; i <= numLines; i++) {
      const y = (panY % (15 * zoom)) + i * 15 * zoom;
      ctx.moveTo(-ctx.canvas.width, y);
      ctx.lineTo(ctx.canvas.width, y);
    }

    ctx.stroke();
  };

  // Function to handle the canvas draw loop
  const draw = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // save context state
    ctx.save();

    // translate and scale context
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    // draw grid
    drawGrid(ctx);

    // restore context state
    ctx.restore();

    // request next animation frame
    requestAnimationFrame(draw);
  };

  // Event listener for mouse down (panning start)
  const handleMouseDown = (event) => {
    const startPanX = event.clientX - panX;
    const startPanY = event.clientY - panY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Function to handle mouse move during panning
    function handleMouseMove(event) {
      // calculate new pan values
      let newPanX = event.clientX - startPanX;
      let newPanY = event.clientY - startPanY;

      // add constraints to panning
      if (newPanX < -100) {
        newPanX = -100;
      } else if (newPanX > 100) {
        newPanX = 100;
      }
      if (newPanY < -100) {
        newPanY = -100;
      } else if (newPanY > 100) {
        newPanY = 100;
      }

      // update pan values
      setPanX(newPanX);
      setPanY(newPanY);
    }

    // Function to handle mouse up (panning end)
    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  // Event listener for wheel (zooming)
  const handleWheel = (event) => {
    event.preventDefault();

    // update zoom based on scroll direction
    let newZoom;
    if (event.deltaY < 0) {
      newZoom = zoom * zoomFactor;
    } else {
      newZoom = zoom / zoomFactor;
    }

    // check if new zoom value is within bounds
    if (newZoom >= minZoom && newZoom <= maxZoom) {
      // update zoom value
      setZoom(newZoom);
    }
  };

  // Effect hook to start the animation loop on component mount
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    draw();
  }, []);

  return (
    <canvas
      id="canvas"
      width={2 * window.innerWidth}
      height={2 * window.innerHeight}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    />
  );
};

export default MyCanvasComponent;
