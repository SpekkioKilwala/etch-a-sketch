"use strict";

const drawArea = document.querySelector('#drawArea');
// console.log(drawArea);
let sideLength = 16;
// const initialColor = [192, 192, 192]; // rgb
// const finalColor = [0, 0, 0]; // still rgb
const initialColor = [0, 0, 75] // hsl
const finalColor = [0, 0, 0] // hsl
const colorIncrements = 10;

createGrid(sideLength);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const toHSLArray = hslStr => hslStr.match(/\d+/g).map(Number);

function createGrid(sideLength) {
  deleteChildren(drawArea);
  for (let x = 0; x < sideLength; x++) {
    // create a new column
    const column = document.createElement('div');
    for (let y = 0; y < sideLength; y++) {
        // create, style, and append all the children to that column
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        setBackgroundColor(cell, strHSL(initialColor));
        cell.addEventListener('click', () => {console.log(cell)});
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

function strHSL(color) {
  // given an HSL colour like [0, 0, 75] (meaning 0, 0%, 75%)
  // return the string hsl(0, 0%, 75%);
  // in this case the first value hue is 0-300something, the others are 0-1
  if (color.length == 3) {
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
  }
}

function setBackgroundColor(element, color) {
  // given an element and any valid CSS-type color, stick it on
  // be aware that this being a super-specific rule it seems
  // to OVERRIDE the general :hover rule
  element.setAttribute('style', `background-color: ${color};`)
}

function darken(element) {
  const newColor = shiftHSL(getColor(element), [0, 0, -7.5]);
  setBackgroundColor(element, newColor);
}

function getColor(element){
  // note that this CAN'T grab what's in the CSS, only
  // what was assigned by the JS.
  const hsl = element.style.backgroundColor;
  return toHSLArray(hsl);
}

function shiftHSL(initial, shift) {
  // given a HSL [A, B, C] and a modification to that [D E F]
  // return [A+D%360, B+E, C+F]
  // in the initial version this will usually be used with [0, 0, -7.5]
  if ((initial.length == 3) && (shift.length == 3)) {
    let h = initial[0] + shift[0];
    h = ((h % 360) + 360) % 360; // h has a valid range 0-360
    let s = initial[1] + shift[1];
    s = clamp(s, 0, 100);
    let l = initial[2] + shift[2];
    l = clamp(l, 0, 100);
    return [h, s, l];
  }
  console.log(`Can't shift HSL: ${initial} ${shift}`)
  return initial
}
