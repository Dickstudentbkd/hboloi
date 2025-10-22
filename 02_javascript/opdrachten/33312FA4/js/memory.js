"use strict";

class Card {
    constructor(cardObject) {
        this.card1 = cardObject.card1;
        this.card2 = cardObject.card2;
        this.set = cardObject.set;
        this.sound = cardObject.sound;
    }
}

let boardClass, iFieldSize;
let myCardArray = [];
let iClicks = 0; //aantal clicks...
let iSets = 0, iSetsMax; //aantal weggespeelde sets / maximum.
document.addEventListener("DOMContentLoaded", welcomePlayer);
const selectedCards = {first: "", second: ""}; //om keuzes te vergelijken...
function welcomePlayer() {
    // vullen localStorage;
    let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
    if (playerInfo) {
        alert("Welkom " + playerInfo.name + "!\n" +
            "Highscores: \n" +
            "\t4x4: " + playerInfo.highscore4 + "\n" +
            "\t5x5: " + playerInfo.highscore5 + "\n" +
            "\t6x6: " + playerInfo.highscore6 + "\n");
    } else {
        let player = prompt("Geef uw naam: ");
        playerInfo = {
            name: player,
            highscore4: 0,
            highscore5: 0,
            highscore6: 0
        }
        if (player != null) {
            localStorage.setItem('playerinfo', JSON.stringify(playerInfo));
            alert("Welkom " + playerInfo.name + "!");
        }
    }
    document.getElementById("player").innerHTML = "<p>Speler: " + playerInfo.name + "</p>";
}

fetch("data/cards.json")
    .then(response => response.json())
    .then(data => {
        myCardArray = data.map(card => new Card(card));
        console.log(myCardArray);
    })
    .catch(error => {
        console.error("Error:", error);
    });
// constanten declareren
const myField = document.getElementById("field");
const mySelect = document.getElementById("selectFieldSize");
const gameScore = document.getElementById("gameScores");
const resetButton = document.getElementById("reset");
myField.addEventListener("click", onClickCard);
mySelect.addEventListener("change", onSelectFieldsize);
resetButton.addEventListener("click", resetLocalinfo);

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
// Fieldsize bepalen
function onSelectFieldsize(e) {
    let fieldSize = e.target.value;
    iFieldSize = fieldSize;
    iSetsMax = (fieldSize * fieldSize) / 2;
    let myCustomCardArray = shuffle(myCardArray);
    switch (fieldSize) {
        case "4":
            boardClass = "board4";
            myCustomCardArray = myCardArray.slice(0, 8);
            break;
        case "5":
            boardClass = "board5";
            myCustomCardArray = myCardArray.slice(0, 12);
            break;
        case "6":
            boardClass = "board6";
            myCustomCardArray = myCardArray.slice(0, 18);
            break;
    }
    let myCardSet = myCustomCardArray;
    myCardSet = myCardSet.concat(myCustomCardArray);
    myCardSet = shuffle(myCardSet);
    populateField(myCardSet);
}
// speelveld (html-code) opbouwen
function populateField(myCardSet) {
    myField.innerHTML = "";
    myCardSet.forEach(card => {
        let newTile = document.createElement("div");
        let newCard = document.createElement("img");
        let cover = document.createElement("img");
        newTile.setAttribute("class", boardClass);
        let imageURL = "img/" + card.card1 + ".jpg";
        newCard.setAttribute("src", imageURL);
        cover.setAttribute("src", "img/cover.png");
        cover.setAttribute("class", "covered");
        newCard.setAttribute("name", card.card1);
        newTile.appendChild(newCard);
        newTile.appendChild(cover);
        myField.appendChild(newTile);
    });
}
// aanklikken van een Card...
function onClickCard(e) {
	// alleen als de className 'covered' is wordt het plaatje omgedraaid
    if (e.target.className === "covered") {
        e.target.className = "uncovered";
        const cardName = e.target.parentNode.firstChild.getAttribute("name");
		//geluid wordt aangeroepen
        playSound(cardName);
		// controle clicks/bijhouden scores
        keepScore(cardName);
        console.log(cardName);
    }

}
// geluid afspelen
function playSound(fileName) {
    let sound = new Audio();
    sound.src = 'snd/' + fileName + '.wav';
    sound.play();
}
//scores invullen...
function setHighScore() {
    let rondes;
    if (iClicks === 2) {
        rondes = 1;
    } else {
        rondes = iClicks / 2;
    }

    gameScore.innerHTML = "Rondes: " + rondes + "<br>" +
        "Sets: " + iSets;

    if (iSets === iSetsMax) {
        //game over
        document.getElementById("gameover").innerHTML = "GAME OVER!!";
        //localinfo aanpassen
        let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));
        let player = playerInfo.name;
        let highscore4 = playerInfo.highscore4;
        let highscore5 = playerInfo.highscore5;
        let highscore6 = playerInfo.highscore6;
        //Highscore bepalen op basis van FieldSize...
        switch (iFieldSize) {
            case "4":
                highscore4++;
                break;
            case "5":
                highscore5++;
                break;
            case "6":
                highscore6++;
                break;
        }
        playerInfo = {
            name: player,
            highscore4: highscore4,
            highscore5: highscore5,
            highscore6: highscore6
        }
        localStorage.setItem('playerinfo', JSON.stringify(playerInfo));
    }
}
// bijhouden scores
function keepScore(card) {
    iClicks++;
    console.log("aantal kliks: " + iClicks);
    if ((iClicks % 2) === 0) { //bepalen of er 2 kaartjes zijn omgedraaid
        selectedCards.second = card;
        //set timer: bevriezen van kaartjes
        setTimer(3);
        const match = evaluateMatch(); //geeft true of false

        if (match) { // kaartjes zijn identiek...
            iSets++;
			setTimeout(setCardsCovered, 1000, match);
            console.log("Kaarten verwijderen... ")
        } else {
			setTimeout(setCardsCovered, 3000, match);
            console.log("Kaarten weer terugdraaien...")
        }
        setHighScore();
    } else { // betreft het eerste kaartje
        selectedCards.first = card;
    }
}
// timer instellen zodat onClickCard niet werkt
function setTimer(sec) {
    myField.removeEventListener("click", onClickCard);
    // Na x seconden weer inschakelen
    setTimeout(() => {
        myField.addEventListener("click", onClickCard);
        console.log("Klikken weer mogelijk!")
    }, sec * 1000);
}
// vergelijkt de kaartjes
function evaluateMatch() {
    if (selectedCards.first === selectedCards.second) {
        return true;
    } else {
        return false;
    }
}
// zet de kaartjes om
function setCardsCovered(match) {
    const cards = document.querySelectorAll("#field > div");
    cards.forEach(card => {
        const cover = card.querySelector("img:last-child");
        console.log(cover.classList.value);
        if (cover.classList.contains("uncovered")) {
            if (match) {
                cover.classList.remove("uncovered")
				// cover wordt groen... en niet meer aanklikbaar
                cover.classList.add("disabledCard");
                cover.src = "img/nocard.png";
            } else { //kaartjes worden 'omgedraaid'
                cover.classList.remove("uncovered")
                cover.classList.add("covered");
            }
        }
    });
}
// reseten van de localStorage
function resetLocalinfo() {
    localStorage.clear();
}