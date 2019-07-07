'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const circles = [];
const crosses = [];
const objectsQuantity = randomInt(50, 200) / 2;

function setCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function randomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

const nextPoint1 = function (x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

const nextPoint2 = function (x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function getSize() {
  return randomInt(1, 6) / 10;
}

function createCircle() {
  const circle = {};
  circle.size = getSize();
  circle.x = randomInt(0, canvas.width);
  circle.y = randomInt(0, canvas.height);
  circle.timeFunc = Math.random() > 0.5 ? nextPoint1 : nextPoint2;
  circle.r = 12 * circle.size;
  circles.push(circle);
}

function drawCircle(size, x, y, timeFunc, r) {
  const coords = timeFunc(x, y, Date.now());
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5 * size;
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

function createX() {
  const x = {};
  x.size = getSize();
  x.x = randomInt(0, canvas.width);
  x.y = randomInt(0, canvas.height);
  x.timeFunc = Math.random() > 0.5 ? nextPoint1 : nextPoint2;
  x.l = 20 * x.size;
  x.angle = randomInt(0, 360);
  
  x.speed = 0;
  while (!x.speed) {
    x.speed = randomInt(-2, 2) / 10
  };

  crosses.push(x);
}

function drawX(size, x, y, timeFunc, l, angle, speed) {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5 * size;
  const coords = timeFunc(x, y, Date.now());
  ctx.beginPath();
  ctx.save();
  ctx.translate(coords.x, coords.y);
  ctx.rotate(angle * 180 / Math.PI);
  ctx.moveTo(-l / 2, 0);
  ctx.lineTo(l / 2, 0);
  ctx.moveTo(0, -l / 2);
  ctx.lineTo(0, l / 2);
  ctx.restore();
  ctx.closePath();
  ctx.stroke();
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    drawCircle(
      circles[i].size,
      circles[i].x,
      circles[i].y,
      circles[i].timeFunc,
      circles[i].r);
    drawX(
      crosses[i].size,
      crosses[i].x,
      crosses[i].y,
      crosses[i].timeFunc,
      crosses[i].l,
      crosses[i].angle,
      crosses[i].speed
    );

    crosses[i].angle += crosses[i].speed;
  }
}

function init() {

  circles.length = 0;
  crosses.length = 0;
  setCanvasSize();

  for (let i = 0; i < objectsQuantity; i++) {
    createCircle();
    createX();
  }
  setInterval(repaint, 50);
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', init);