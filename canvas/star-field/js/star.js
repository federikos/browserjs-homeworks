'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function randomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

const starColors = ['#ffffff', '#ffe9c4', '#d4fbff' ];
canvas.style.backgroundColor = '#000000';

function generateStarField() {
  const quantity = randomInt(200, 400);
  const canvasSize = {
    width: canvas.clientWidth, 
    height: canvas.clientHeight
  };

  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  for (let i = 0; i < quantity; i++) {
    const starSize = randomInt(0, 11) / 10;
    const starPosition = {
      x: randomInt(0, canvasSize.width),
      y: randomInt(0, canvasSize.height)
    }
    const starColor = starColors[randomInt(0, 2)];
    const starBrightness = randomInt(8, 10) / 10;

    ctx.beginPath();
    ctx.fillStyle = starColor;
    ctx.globalAlpha = starBrightness;
    ctx.moveTo(starPosition.x, starPosition.y);
    ctx.fillRect(starPosition.x, starPosition.y, starSize, starSize);
    ctx.fill();
    ctx.closePath();
  }
}

canvas.addEventListener('click', generateStarField);

generateStarField();