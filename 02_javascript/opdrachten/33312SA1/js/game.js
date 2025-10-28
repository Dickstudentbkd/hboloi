"use strict";

document.addEventListener("DOMContentLoaded", resetHTML);
class Board {
    newCell;
    constructor(rows = 3, columns = 3) {
        this.rows = rows;
        this.columns = columns;
        this.state = [];
        const row = []; // voegt row toe
         for (let i=0;i<rows;i++) {
            // const row = []; // voegt row toe
            for (let j=0;j<columns;j++) {
                row.push(""); // voegt lege cel toe aan row
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
        this.activePlayer = startPlayer;
        let player = document.createElement("div");
        player.setAttribute("id","player");
        player.innerHTML = "Player begin: " + startPlayer;
        board.appendChild(player);
        //Active player aanwijzen
        this.setActivePlayer(startPlayer);

        // create html-code...
        let iField = 0;
        for (let i = 0; i < this.rows; i++) {
            let newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            newRow.setAttribute("data-value", i);
            for (let j = 0;j < this.columns;j++) {
                iField++;
                this.newCell = document.createElement( "div");
                this.newCell.setAttribute("class", "cell");
                this.newCell.setAttribute("data-value", j);
                newRow.appendChild(this.newCell);
                //op cell-niveau add event-listener
                this.newCell.addEventListener("click", this.onClickField, true);
            }
            board.appendChild(newRow);
        }
        // board.addEventListener("click", this.onClickField.bind(this), false);
    }
    //bij aanklikken van een veld
    onClickField = (e) => {
        let field = e.target;
        let rowDiv = e.target.closest(".row");
        let rowValue = rowDiv.getAttribute("data-value");
        let cellValue = e.target.getAttribute("data-value");
        console.log('Field class: ' + field.className + " " + this.activePlayer.toLowerCase() + " Data-value: " + cellValue
                        + "\n" + rowValue);
        field.className = field.className + " " + this.activePlayer.toLowerCase();
        //remove eventlistener...
        field.removeEventListener("click", this.onClickField, true);
        //Daarna wegschrijven naar array
        this.setValuePlayer(this.activePlayer, rowValue, cellValue);
        this.isWinner(this.activePlayer);
        //wissel player
        this.changePlayer();
        //instellen op board
        this.setActivePlayer(this.activePlayer);

        //Daarna berekenen of er een win-situatie is
    }
    startPlayer() {
        const players = ["X","O"];
        let randNumber = Math.floor((Math.random() * 2));
        return players[randNumber];
    }
    //Beurt verwisselen player
    changePlayer() {
        this.activePlayer = this.activePlayer === "O" ? "X" : "O";
    }
    setActivePlayer(playerXO) {
        const scoreBoardPlayer = document.getElementById("score");

        //scoreBoardPlayer.set VERDER (BkD 28-10-2025)
        //active player: background default
        //inactive player: background gray
        if (playerXO === "X") {
            scoreBoardPlayer.querySelector("div:nth-child(1)").style.removeProperty("background-color");
                        // scoreBoardPlayer.querySelector("div:nth-last-child(1)").style.backgroundColor = "grey";
            scoreBoardPlayer.querySelector("div:nth-of-type(2)").style.backgroundColor = "lightgray";
            console.log("X: actief");
        } else {
            scoreBoardPlayer.querySelector("div:nth-child(1)").style.backgroundColor = "lightgray";
            scoreBoardPlayer.querySelector("div:nth-of-type(2)").style.removeProperty("background-color");
            console.log("O: actief");
        }
    }
    setValuePlayer(player, iRow, iCell) {
        // console.log("Player: " + player + " Row/Cell: " + iRow + "/" + iCell);
        this.state[iRow][iCell] = player;
        console.log("value (row/cell): " + iRow + "/" + iCell + " | " + this.state[iRow][iCell]);
    }
    isWinner(playerChar) {
        //wincondition
        let winc = inputWinCondition.value;
        for (let r=0;r<this.state.length;r++) {
            for (let c=0;c<this.state[r].length;c++) {
                console.log(r + "/" + c + "|" + this.state[r][c])
            }
        }
    }
}//End class Board...

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
    const gameArea = new Board(rows, columns); // aanmaken object vanuit class Board
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


}
