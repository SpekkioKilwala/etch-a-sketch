"use strict";

const drawArea = document.querySelector('#drawArea');
// console.log(drawArea);
let sideLength = 16;
const initialColor = [192, 192, 192]; // rgb
const finalColor = [0, 0, 0]; // still rgb
const colorIncrements = 10;

createGrid(sideLength);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function createGrid(sideLength) {
  deleteChildren(drawArea);
  for (let x = 0; x < sideLength; x++) {
    // create a new column
    const column = document.createElement('div');
    for (let y = 0; y < sideLength; y++) {
        // create, style, and append all the children to that column
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        column.appendChild(cell);
    }
    // finally style the column and add it to the div
    column.setAttribute('class', 'column')
    drawArea.appendChild(column);
  }
}

function deleteChildren(element) {
  while (element.hasChildNodes()) {element.removeChild(element.firstChild)}
}

function strRGB(color) {
  // given a RGB colour like [192, 192, 192]
  // return the string "rgb(226, 197, 158)" WITHOUT the semicolon.
  // (because I'll be using this in backtick formatted strings, semicolon is easy to add.)
  return `rgb(${color.join(", ")})`
}

function interpolatedStep(initial, min, max, numSteps) {
  // We have a number scale with limits of min and max,
  // and an initial value that is hopefully somewhere within that scale.
  // The distance between min and max has numSteps divisions (or steps).
  // returns (interpolatedStep + one step) capped to min, max.
  const step = (max - min)/numSteps;
  // clamp() needs min < max, so swap values for that
  if (min > max) {
    max = [min, min = max][0];
  }
  return clamp((initial + step), min, max);
}

function colorStep(value) {
  return interpolatedStep(value, initialColor, finalColor, colorIncrements)
}

function darkenColor(initial) {
  return initial.map(colorStep)
}