"use strict";
const width = 900;
const height = 900;
const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.querySelector("body").appendChild(canvas);
let canvasContext = canvas.getContext("2d");

// State of spiral
let x, y, px, py;
let step = 1;
let state = 0;
let numSteps = 1;
let turnCounter = 1;

// Scale / resolution
let stepSize = 4;
let totalSteps;

// Function to test if number is prime
function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= Math.sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

function drawCircle(
  canvasContext,
  x,
  y,
  radius,
  fillColor = "#FFF",
  strokeColor = "#FFF"
) {
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2);
  canvasContext.fillStyle = fillColor;
  canvasContext.strokeStyle = strokeColor;
  canvasContext.fill();
  canvasContext.stroke();
}

function drawLine(canvasContext, fromX, fromY, toX, toY, strokeColor="#FFF"){
    canvasContext.beginPath();
    canvasContext.moveTo(fromX, fromY);
    canvasContext.lineTo(toX, toY);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.stroke();
}

function setup() {
  x = width / 2;
  y = height / 2;
  canvasContext.fillRect(0, 0, width, height);
  canvasContext.fillStyle = "#000";
  canvasContext.fill();

  // set up spiral
  const cols = width / stepSize;
  const rows = height / stepSize;
  totalSteps = cols * rows;
  return true;
}

function draw() {
  while (step <= totalSteps) {
    // If prime draw circle
    if (isPrime(step)) {
      drawCircle(canvasContext, x, y, stepSize * 0.5, '#0f0', '#0f0');
    }

    // Draws line between circles of prime numbers
    drawLine(canvasContext, x, y, px, py, '#0f0')
    px = x;
    py = y;

    switch (state) {
      case 0:
        x += stepSize;
        break;
      case 1:
        y -= stepSize;
        break;
      case 2:
        x -= stepSize;
        break;
      case 3:
        y += stepSize;
        break;
    }

    // Change state
    if (step % numSteps == 0) {
      state = (state + 1) % 4;
      turnCounter++;
      if (turnCounter % 2 == 0) {
        numSteps++;
      }
    }
    step++;

    // Fail safe
    if (step > totalSteps) {
      break;
    }
  }
}

function render() {
  let isSetupFinished = setup();
  if (isSetupFinished) draw();
  console.log("rendering is finished");
}

render();
