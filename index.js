"use strict";

const drawArea = document.querySelector('#drawArea');
// console.log(drawArea);
let sideLength = 4;

createGrid(sideLength);

function createGrid(sideLength) {
  deleteChildren(drawArea);
  for (let x = 0; x < sideLength; x++) {
    // create a new column
    const column = document.createElement('div');
    column.setAttribute('style', 'border: 3px;');
    for (let y = 0; y < sideLength; y++) {
        // create, style, and append all the children to that column
        const cell = document.createElement('div');
        cell.setAttribute('style', 'border: 2px dotted blue; width: 30px; height: 30px');
        column.appendChild(cell);
    }
    // finally style the column and add it to the div
    drawArea.appendChild(column);
  }
}

function deleteChildren(element) {
  while (element.hasChildNodes()) {element.removeChild(element.firstChild)}
}
