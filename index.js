"use strict";

const drawArea = document.querySelector('#drawArea');
const btClear = document.querySelector('#btClear');
const btResize = document.querySelector('#btResize');

let sideLength = 16;
const initialColor = [192, 192, 192]; // rgb
const finalColor = [0, 0, 0]; // still rgb
const numSteps = 10;
const simpleDarken = deriveSimpleDarken(initialColor, finalColor, numSteps);
const colorIncrements = 10;

createGrid(sideLength);
btClear.addEventListener('click', () => {createGrid(sideLength);});

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const toHSLArray = hslStr => hslStr.match(/\d+/g).map(Number);
const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);

function createGrid(sideLength) {
  deleteChildren(drawArea);
  for (let x = 0; x < sideLength; x++) {
    // create a new column
    const column = document.createElement('div');
    for (let y = 0; y < sideLength; y++) {
        // create, style, and append all the children to that column
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        setBackgroundColor(cell, strRGB(initialColor));
        cell.addEventListener('mouseover', () => {darken(cell)});
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
// given an RGB colour like [50, 100,150]
// return the string rgb(50, 100, 150);
  if (color.length == 3) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }  
}

function setBackgroundColor(element, color) {
  // given an element and any valid CSS-type color, stick it on
  // be aware that this being a super-specific rule it seems
  // to OVERRIDE the general :hover rule
  element.setAttribute('style', `background-color: ${color};`)
}

function darken(element) {
  const newColor = shiftRGB(getColor(element), simpleDarken);
  console.log(newColor);
  setBackgroundColor(element, strRGB(newColor));
}

function deriveSimpleDarken(initial, final, numSteps) {
  const r = (final[0] - initial[0])/numSteps;
  const g = (final[1] - initial[1])/numSteps;
  const b = (final[2] - initial[2])/numSteps;
  return [r, g, b];
}

function getColor(element){
  // note that this CAN'T grab what's in the CSS, only
  // what was assigned by the JS.
  // worse yet, this seems to only return it as an RGB.
  const rgb = element.style.backgroundColor;
  console.log(rgb);
  console.log(toRGBArray(rgb));
  return toRGBArray(rgb);
}

function shiftRGB(initial, shift) {
  // given a RGB [A, B, C] and a modification to that [D E F]
  // return [A+D, B+E, C+F]
  // in the initial version this will usually be used with [-10, -10, -10]
  if ((initial.length == 3) && (shift.length == 3)) {
    let r = initial[0] + shift[0];
    r = clamp(r, 0, 255)
    let g = initial[1] + shift[1];
    g = clamp(g, 0, 255);
    let b = initial[2] + shift[2];
    b = clamp(b, 0, 255);
    return [r, g, b];
  }
  console.log(`Can't shift RGB: ${initial} ${shift}`)
  return initial
}
