"use strict";

document.addEventListener("DOMContentLoaded", resetHTML);
class Board {
    constructor(rows = 3, columns = 3) {
        this.rows = rows;
        this.columns = columns;
        this.state = [];
        const row = []; // voegt row toe
         for (let i=0;i<rows;i++) {
            // const row = []; // voegt row toe
            for (let j=0;j<columns;j++) {
                row.push(j); // voegt lege cel toe aan row
            }
            this.state.push(row); //voegt volledige row toe aan state...
        }
          console.log('ROW 5: ' + this.state[0][2]);
    }
    createBoard(boardId) {
        const board = document.getElementById(boardId);
        board.innerHTML = "";
        console.log('Rows: ' + this.rows + " Columns: " + this.columns);
        const startPlayer = this.startPlayer();
        let player = document.createElement("div");
        player.setAttribute("id","player");
        player.innerHTML = "Player: " + startPlayer;
        board.appendChild(player);

        // create html-code...
        let iField = 0;
        for (let i = 0; i < this.rows; i++) {
            let newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            for (let j = 0;j < this.columns;j++) {
                iField++;
                let newCell = document.createElement( "div");
                newCell.setAttribute("class", "cell");
                newCell.setAttribute("data-value", iField);
                newRow.appendChild(newCell);
            }
            board.appendChild(newRow);
        }
        board.addEventListener("click", this.onClickField);
    }
    //bij aanklikken van een veld
    onClickField(e) {
        let field = e.target.className;
        let dataValue = e.target.getAttribute("data-value");
        console.log('Field class: ' + field + "\n" + "Data-value: " + dataValue);
        // alert("Yes, gelukt to zover!" + field + "\n" + "Data-value: " + dataValue);

        e.target.className = field + " " + "x";
        //Todo... tot zover werkt het; "x" moet actualPlayer worden. Deze moet bijgehouden worden!
        //Daarna wegschrijven naar array
        //Daarna berekenen of er een win-situatie is
    }
    startPlayer() {
        const players = ["X","Y"];
        let randNumber = Math.floor((Math.random() * 2));
        return players[randNumber];
    }

}

const scores = document.getElementById("score");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
// Sliders instellingen
const inputWidth = document.getElementById("input-width")
const inputHeight = document.getElementById("input-height")
const inputWinCondition = document.getElementById("input-win-condition")
inputWidth.addEventListener("change", initializeSliders) ;
inputHeight.addEventListener("change", initializeSliders);
inputWinCondition.addEventListener("change", initializeSliders);
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
    inputWinCondition.max = 3;
    createBoard(3, 3); //default
}
function createBoard(rows, columns) {
    const gameArea = new Board(rows, columns);
    gameArea.createBoard("board");
    let playerStart = gameArea.startPlayer();
    console.log(playerStart);
}
//inputWidth, inputHeight, inputWin
function initializeSliders() {
    let inputWidthV = inputWidth.value;
    let inputHeightV = inputHeight.value;
    let inputWinV = inputWinCondition.value;
    //de laagste waarde van Width/Height wordt max Win value
    let maxWinV = Math.min(inputWidthV, inputHeightV);
    if (maxWinV > 6) { // eis waarde: 3 - 6...
        maxWinV = 6;
    }
    if (inputWinV > maxWinV) { // eventueel correctie waarde
        inputWinCondition.value = maxWinV;
        inputWinCondition.nextElementSibling.value = maxWinV;
    }
    inputWinCondition.max = maxWinV;
    //opnieuw opbouwen gameArea/Board..
    createBoard(inputWidthV, inputHeightV);
    // console.log("Width: " + inputWidthV);
    // console.log("Height: " + inputHeightV);
    // console.log("WIN: " + inputWinV);

}
function isWinner(playerChar) {

}