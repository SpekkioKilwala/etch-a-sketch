"use strict";

const drawArea = document.querySelector('#drawArea');
// console.log(drawArea);

createGrid(4);

// First: Can put a text into that Draw Area
function createGrid(sideLength) {
    const div = document.createElement('div');
    div.setAttribute('style', 'color: blue; width: 100px; height: 100px;');
    div.textContent = "A thing!"
    drawArea.appendChild(div);
}