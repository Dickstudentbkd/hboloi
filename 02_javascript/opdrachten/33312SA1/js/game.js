"use strict";

document.addEventListener("DOMContentLoaded", resetHTML);
class Board {
    newCell;
    constructor(rows = 3, columns = 3, wincondition = 3) {
        this.rows = rows;
        this.columns = columns;
        this.wincondition = wincondition;
        this.state = [];
        // const row = []; // voegt row toe
        //array speelveld
         for (let i=0;i<this.rows;i++) {
            this.state[i] =[];
            for (let j=0;j<this.columns;j++) {
                this.state[i][j] = "-";
            }
        }
          console.log('ROW 5: ' + this.state[0][2]);
          console.log("STATE: rows: " + this.state.length);
          console.log("STATE: columns: " + this.state[2].length);
          console.log("STATE ARRAY: " + this.state[0]);
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
        //is er al een winner?
        if (this.isWinner(this.activePlayer)) {
            console.log("ER IS EEN WINNAAR!!!");
            //scores verwerken
            setPlayerInfoWin(this.activePlayer);
            //removeEventListener(s)

            //Tekst of rand rond board met winnaar?
        } else { //gewoon doorgaan...
            //wissel player
            this.changePlayer();
            //instellen op board
            this.setActivePlayer(this.activePlayer);
        }


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
        let rows = this.state.length;
        let columns = this.state[0].length;
        let winner = false;
        //check vertical
        for (let r=0;r<rows-winc+1;r++) { //rijen, corr wincondition
            console.log("RIJ: " + r);
            for (let c=0;c<columns;c++) {
                console.log(r + "/" + c + "|" + this.state[r][c])
                for (let w=0;w<winc;w++ ) { //loop lengte wincondition
                    if (this.state[r+w][c] === playerChar) {
                        winner = true;
                    } else { //false..
                        winner = false;
                        break; //exit uit for
                    }
                }
                if (winner) {
                    console.log("WINNER: " + winner);
                    console.log("Gewonnen: " + playerChar);
                    return true;
                }
             }
        }
        //horizontaal
        for (let r=0;r<rows-winc+1;r++) { //rijen doorlopen, corr wincondition
            console.log("RIJ: " + r);
            for (let c=0;c<columns;c++) { //kolommen doorlopen
                for (let w=0;w<winc;w++ ) { //loop lengte wincondition
                    if (this.state[r][c+w] === playerChar) {
                        winner = true;
                    } else { //false..
                        winner = false;
                        break; //exit uit for
                    }
                }
                if (winner) {
                    console.log("WINNER: " + winner);
                    console.log("Gewonnen: " + playerChar);
                    return true;
                }
            }
        }
        //check diagonal boven->beneden
        let i = 0;
        for (let r=0;r<rows-winc+1;r++) {
            for (let c=0;c<winc;c++ ) {
                for (let w=0;w<winc;w++ ) { //loop lengte wincondition
                    if (this.state[r+w][c+w] === playerChar) {
                        winner = true;
                    } else { //false..
                        winner = false;
                        break; //exit uit for
                    }
                }
                if (winner) {
                    console.log("WINNER: " + winner);
                    console.log("Gewonnen: " + playerChar);
                    return true;
                } else {
                    console.log("Check diagonaal -boven-> beneden");
                }
            }
        }
        //check diagonal beneden->boven
        //bij loop door rows: als hoogte< dan winc, ook stoppen
        //hier: zolang r>=winc; als r<winc dust stoppen.
        console.log("rows:" + rows + " winc: " + winc + " ")
        for (let r=rows-1;r>=winc-1;r--) { //controle winc..
            for (let c=0;c<columns-1;c++ ) {
                for (let w=0;w<winc;w++ ) { //loop lengte wincondition
                      console.log("r-w: " + r);
                      console.log("c+w: " + c);
                      console.log("w: " + w);
                    if (this.state[r-w][c+w] === playerChar) {
                        winner = true;
                    } else { //false..
                        winner = false;
                        break; //exit uit for
                    }
                }
                if (winner) {
                    console.log("->WINNER: " + winner);
                    console.log("->Gewonnen: " + playerChar);
                    return true;
                } else {
                    console.log("Check diagonaal -beneden -> boven");
                }
            }
        }
            console.log("END OF isWinner...");
        return false;
    }
}//End class Board...
//global constantes
const scores = document.getElementById("score");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-rest");
// Sliders instellingen
const inputWidth = document.getElementById("input-width")
const inputHeight = document.getElementById("input-height")
const inputWinCondition = document.getElementById("input-win-condition")
inputWidth.addEventListener("change", initializeSliders) ;
inputHeight.addEventListener("change", initializeSliders);
inputWinCondition.addEventListener("change", initializeSliders);
btnStart.addEventListener("click", playAgain);
btnReset.addEventListener("click", resetGame);
//
//Correctie 'oneffenheden' in HTML:
// - pad plaatjes
// - score player O
function resetHTML() {
    scoreX.innerHTML = " ";
    scoreO.innerHTML = " ";
    const images = scores.querySelectorAll("img");
    const playerX = images[0];
    const playerO = images[1];
    playerX.src = './images/playerX.svg';
    playerO.src = './images/playerO.svg';
    inputWinCondition.max = 3;
    createBoard(3, 3, 3); //default
}
function createBoard(rows, columns, wincondition) {
    const gameArea = new Board(rows, columns, wincondition); // aanmaken object vanuit class Board
    gameArea.createBoard("board");
    let playerStart = gameArea.startPlayer();
    initPlayerInfo();
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
    createBoard(inputHeightV, inputWidthV, inputWinV);
}
//Start game opnieuw...
function playAgain() {
    createBoard(inputWidth.value, inputHeight.value, inputWinCondition.value);
}
//localStorage bijhouden: key=playerinfo; var=playerInfo;
function initPlayerInfo() {
    let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
    if (!playerInfo) {
        playerInfo = {
            x: 0,
            o: 0
        }
        localStorage.setItem('playerinfo', JSON.stringify(playerInfo));
    }
    document.getElementById("score-x").innerHTML = playerInfo.x;
    document.getElementById("score-o").innerHTML = playerInfo.o;
}
function setPlayerInfoWin(player) {
    let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
    if (!playerInfo) {
        initPlayerInfo;
    }
    playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
    let scoreX = playerInfo.x;
    let scoreO = playerInfo.o;
    if (player.toLowerCase()==="x") {
        scoreX++;
    } else if (player.toLowerCase()==="o") {
        scoreO++;
    }
    //terugschrijven...
    playerInfo = {
        x: scoreX,
        o: scoreO
    }
    localStorage.setItem('playerinfo', JSON.stringify(playerInfo));
    document.getElementById("score-x").innerHTML = playerInfo.x;
    document.getElementById("score-o").innerHTML = playerInfo.o;
}
function resetGame() {
    //localstorage legen
    localStorage.clear();
    // let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
    let playerInfo = {
            x: 0,
            o: 0
        }

        localStorage.setItem('playerinfo', JSON.stringify(playerInfo));

    document.getElementById("score-x").innerHTML = playerInfo.x;
    document.getElementById("score-o").innerHTML = playerInfo.o;
    //speelveld opnieuw opbouwen (default)
    createBoard();
}
