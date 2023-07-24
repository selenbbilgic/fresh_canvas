// get canvas element and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas size to fill window
canvas.width = 2*window.innerWidth;
canvas.height = 2*window.innerHeight;

// variables for panning
let panX = 0;
let panY = 0; 

// variables for zooming
let zoom = 1;
const zoomFactor = 1.01;
const minZoom = 0.6; // minimum zoom level
const maxZoom = 3; // maximum zoom level



// draw grid
function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 2;

  // calculate the number of lines to draw based on the zoom level
  const numLines = Math.ceil(Math.max(canvas.width, canvas.height) / (5*zoom));
  // draw vertical lines
  for (let i = -numLines; i <= numLines; i++) {
    const x = (panX % (15 * zoom)) + i * 15 * zoom;
    ctx.moveTo(x, -canvas.height);
    ctx.lineTo(x, canvas.height);
  }
  
  // draw horizontal lines
  for (let i = -numLines; i <= numLines; i++) {
    const y = (panY % (15 * zoom)) + i * 15 * zoom;
    ctx.moveTo(-canvas.width, y);
    ctx.lineTo(canvas.width, y);
  }

  ctx.stroke();
}

// draw function
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // save context state
  ctx.save();

  // translate and scale context
  ctx.translate(panX, panY);
  ctx.scale(zoom, zoom);

  // draw grid
  drawGrid();

  // restore context state
  ctx.restore();

  // request next animation frame
  requestAnimationFrame(draw);
}

// start animation loop
draw();

// add event listeners for panning
let isPanning = false;
let startPanX;
let startPanY;

canvas.addEventListener("mousedown", (event) => {
  
  isPanning = true;
  startPanX = event.clientX - panX;
  startPanY = event.clientY - panY;
});

canvas.addEventListener("mousemove", (event) => {
  if (isPanning) {
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
    panX = newPanX;
    panY = newPanY;
  }
});


window.addEventListener("mouseup", () => {
  isPanning = false;
});

// add event listener for zooming
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();

   // update zoom based on scroll direction
   let newZoom;
   if (event.deltaY <0) {
     newZoom = zoom * zoomFactor;
   } else {
     newZoom = zoom / zoomFactor;
   }


     // check if new zoom value is within bounds
  if (newZoom >= minZoom && newZoom <= maxZoom) {
    // update zoom value
    zoom = newZoom;
  }

  // Left and Right Arrow Code
const leftMenu = document.querySelector(".leftMenuContainer");
const rightMenu = document.querySelector(".rightMenuContainer");

const leftArrowBtn = document.querySelector("#leftBtn");
const rightArrowBtn = document.querySelector("#rightBtn");

leftArrowBtn.addEventListener("click", function () {
  leftMenu.classList.toggle("active");
    document.addEventListener("click", function (e) {
      if (
        !e.composedPath().includes(leftArrowBtn) &&
        !e.composedPath().includes(leftMenu)
      ) {
        leftMenu.classList.remove("active");
      }
    });
  });

  rightArrowBtn.addEventListener("click", function () {
    rightMenu.classList.toggle("active");
    document.addEventListener("click", function (e) {
      if (
        !e.composedPath().includes(rightArrowBtn) &&
        !e.composedPath().includes(rightMenu)
      ) {
        rightMenu.classList.remove("active");
      }
    });
  });
});