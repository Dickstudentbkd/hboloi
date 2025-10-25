"use strict";

document.addEventListener("DOMContentLoaded", resetHTML);
class Board {
    constructor(rows = 3, columns = 3) {
        this.rows = rows;
        this.columns = columns;
        this.state = [];
        for (let i=0;i<rows;i++) {
            const row = []; // voegt row toe
            for (let j=0;j<columns;j++) {
                row.push(""); // voegt lege cel toe aan row
            }
            this.state.push(row); //voegt volledige row toe aan state...
        }
        // speler definiëren... (random)
    }
    createBoard(boardId) {
        const board = document.getElementById(boardId);
        board.innerHTML = "";
        console.log('Rows: ' + this.rows + " Columns: " + this.columns);
        // create html-code...
        for (let i = 0; i < this.rows; i++) {
            let newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            for (let j = 0;j < this.columns;j++) {
                let newCell = document.createElement( "div");
                newCell.setAttribute("class", "cell");
                newRow.appendChild(newCell);
            }
            board.appendChild(newRow);
        }
        board.addEventListener("click", this.onClickField);
    }
    //bij aanklikken van een veld
    onClickField(e) {
        alert("Yes, gelukt to zover!");
        //Todo... lijkt nog niet goed te werken. Werkt op het hele board en omgeving...
        //
    }

}

const scores = document.getElementById("score");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
// Sliders instellingen
const inputWidth = document.getElementById("input-width")
const inputHeight = document.getElementById("input-height")
inputWidth.addEventListener("change", ) ; // ToDo: afmaken...
console.log("WIDTH: " + inputWidth.value);
console.log("HEIGHT: " + inputHeight.value);
//
//Correctie 'foutjes' in HTML:
// - path plaatjes
// - score player y
function resetHTML() {
    scoreX.innerHTML = " ";
    scoreO.innerHTML = " ";
    const images = scores.querySelectorAll("img");
    const playerX = images[0];
    const playerO = images[1];
    playerX.src = './images/playerX.svg';
    playerO.src = './images/playerO.svg';
    const gameArea = new Board(3, 3);
    gameArea.createBoard("board");
}
