"use strict";

const drawArea = document.querySelector('#drawArea');
// console.log(drawArea);
let sideLength = 16;
const initialColor = [192, 192, 192]; // rgb
const finalColor = [0, 0, 0]; // still rgb
// const initialColor = [0, 0, 75] // hsl
// const finalColor = [0, 0, 0] // hsl
const colorIncrements = 10;

createGrid(sideLength);

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
        cell.addEventListener('click', () => {darken(cell)});
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

// function strHSL(color) {
//   // given an HSL colour like [0, 0, 75] (meaning 0, 0%, 75%)
//   // return the string hsl(0, 0%, 75%);
//   // in this case the first value hue is 0-300something, the others are 0-1
//   if (color.length == 3) {
//     return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
//   }
// }

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
  const newColor = shiftRGB(getColor(element), [-10, -10, -10]);
  console.log(newColor);
  setBackgroundColor(element, strRGB(newColor));
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

// function getColor(element){
//   // note that this CAN'T grab what's in the CSS, only
//   // what was assigned by the JS.
//   // worse yet, this seems to only return it as an RGB.
//   const hsl = element.style.backgroundColor;
//   console.log(hsl);
//   console.log(toHSLArray(hsl));
//   return toHSLArray(hsl);
// }

// function shiftHSL(initial, shift) {
//   // given a HSL [A, B, C] and a modification to that [D E F]
//   // return [A+D%360, B+E, C+F]
//   // in the initial version this will usually be used with [0, 0, -7.5]
//   if ((initial.length == 3) && (shift.length == 3)) {
//     let h = initial[0] + shift[0];
//     h = ((h % 360) + 360) % 360; // h has a valid range 0-360
//     let s = initial[1] + shift[1];
//     s = clamp(s, 0, 100);
//     let l = initial[2] + shift[2];
//     l = clamp(l, 0, 100);
//     return [h, s, l];
//   }
//   console.log(`Can't shift HSL: ${initial} ${shift}`)
//   return initial
// }

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

// function RGBToHSL(rgb) {
//   let sep = rgb.indexOf(",") > -1 ? "," : " ";
//   rgb = rgb.substr(4).split(")")[0].split(sep);

//   for (let R in rgb) {
//     let r = rgb[R];
//     if (r.indexOf("%") > -1) 
//       rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
//   }

//   // Make r, g, and b fractions of 1
//   let r = rgb[0] / 255,
//       g = rgb[1] / 255,
//       b = rgb[2] / 255;

//   ...
// }