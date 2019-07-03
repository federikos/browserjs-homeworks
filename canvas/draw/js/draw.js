'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let needsRepaint = false;
const lines = [];
let brushRadius = 100;
let shouldBrushIncrease = false;
let lineHue = 0;
let hueChangeDirection = false;


function setCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function changeHue() {
  if (hueChangeDirection) {
    if (lineHue <= 0) {
      return;
    }
    lineHue--;
  } else {
    if (lineHue >= 359) {
      return;
    }
    lineHue++;
  }
}

function changeBrushRadius() {
  if (brushRadius === 100) {
    shouldBrushIncrease = false;
  }
  if (brushRadius === 5) {
    shouldBrushIncrease = true;
  }
  if (shouldBrushIncrease) {
    brushRadius++;
    return;
  }
  brushRadius--;
}

function createPoint(x, y, hue, size) {
  return {
    coords: [x, y],
    hue: `hsl(${hue}, 100%, 50%)`,
    size
  }
}

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  lineHue = 1;
  brushRadius = 100;
  shouldBrushIncrease = false;
  const line = [];
  line.push(createPoint(e.pageX, e.pageY, lineHue, brushRadius));
  lines.push(line);
});

canvas.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('mouseleave', () => isDrawing = false);

canvas.addEventListener('dblclick', () => {
  lines.length = 0;
  needsRepaint = true;
});

window.addEventListener('resize', () => {
  setCanvasSize();
  lines.length = 0;
  needsRepaint = true;
});

canvas.addEventListener('mousemove', e => {
  hueChangeDirection = e.shiftKey ? true : false;

  if (isDrawing) {
    lines[lines.length - 1].push(createPoint(e.pageX, e.pageY, lineHue, brushRadius));
    needsRepaint = true;
  }
});

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  lines.forEach(line => {
    for (let i = 0; i < line.length - 1; i++) {
      ctx.fillStyle = line[i].hue;
      ctx.strokeStyle = line[i].hue;
      ctx.lineWidth = line[i].size;
      ctx.beginPath();
      ctx.moveTo(...(line[i].coords));
      ctx.lineTo(...(line[i + 1].coords));
      ctx.stroke();
      ctx.closePath();
    }
  });
}

function tick() {
  changeHue();
  changeBrushRadius();

  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

setCanvasSize();
tick();