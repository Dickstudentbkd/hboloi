"use strict";
class Card {
	constructor(cardObject) {
		this.card1 = cardObject.card1;
		this.card2 = cardObject.card2;
		this.set = cardObject.set;
		this.sound = cardObject.sound;
	}
}
let myCardArray = [];
let iClicks = 0; //aantal clicks...
let iSets = 0; //aantal weggespeelde sets
const selectedCards = {first:"", second:""}; //om keuzes te vergelijken...
function welcomePlayer() {
	// let player = localStorage.getItem('name');
	let playerInfo = JSON.parse(localStorage.getItem('playerinfo'));

	if (playerInfo.name) {
		alert("Welkom " + playerInfo.name + "!\n" +
				 "Highscores: \n" +
					"\t4x4: " + playerInfo.highscore4 + "\n" +
					"\t5x5: " + playerInfo.highscore4 + "\n" +
					"\t6x6: " + playerInfo.highscore4 + "\n");
	}
	else {
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
}
fetch("data/cards.json")
	.then(response => response.json())
	.then(data => {
		myCardArray = data.map(card => new Card(card));
		console.log(myCardArray);
	})
	.catch(error =>
	{
		console.error("Error:", error);
	});



const myField = document.getElementById("field");
const mySelect = document.getElementById("selectFieldSize");
myField.addEventListener("click", onClickCard);
mySelect.addEventListener("change", onSelectFieldsize);
let boardClass;
document.addEventListener("DOMContentLoaded", welcomePlayer);
// let myCardSet;

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

function onSelectFieldsize(e) {
	let fieldSize = e.target.value;
	let myCustomCardArray = shuffle(myCardArray);
	switch (fieldSize) {
	case "4":
		boardClass = "board4";
		myCustomCardArray = myCardArray.slice(0,8);
		break;
	case "5":
		boardClass = "board5";
		myCustomCardArray = myCardArray.slice(0,12);
		break;
	case "6":
		boardClass = "board6";
		myCustomCardArray = myCardArray.slice(0,18);
		break;
	}
	let myCardSet = myCustomCardArray;
	myCardSet = myCardSet.concat(myCustomCardArray);
	myCardSet = shuffle(myCardSet);
	populateField(myCardSet);
}

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

function onClickCard(e) {

	if (e.target.className === "covered") {
		e.target.className = "uncovered";
		const cardName = e.target.parentNode.firstChild.getAttribute("name");
		// playSound(cardName);
		keepScore(cardName); //controle clicks etc.
		console.log(cardName);
	}

}

function playSound(fileName) {
	let sound = new Audio();
	sound.src = 'snd/' + fileName + '.wav';
	sound.play();
}
function setHighScore() {

}

function keepScore(card) {
	iClicks++;
	if ((iClicks % 2) === 0) {
		selectedCards.second = card;
		//set timer
		setTimer(3);
		const match = evaluateMatch();
		if (match) {
			//removecards
			setCardsCovered(match);
			console.log("Kaarten verwijderen\n ")
		} else {
			setCardsCovered(match);
			console.log("Kaarten weer terugdraaien...")
		}
	} else {
		selectedCards.first = card;
	}
}

function setTimer(sec) {
	myField.removeEventListener("click", onClickCard);
	// Na x seconden weer inschakelen
	setTimeout(() => {
		myField.addEventListener("click", onClickCard);
		console.log("Klikken weer mogelijk!")
	}, sec*1000);
}

function evaluateMatch() {
	if (selectedCards.first === selectedCards.second) {
		return true;
	} else {
		return false;
	}
}
function setCardsCovered(match) {
	const cards = document.querySelectorAll("#field > div");
	cards.forEach(card => {
		const cover = card.querySelector("img:last-child");
		console.log(cover.classList.value);
		if (cover.classList.contains("uncovered")) {
			if (match) {
				cover.classList.remove("uncovered")
				cover.classList.add("disabledCard");
			} else {
				cover.classList.remove("uncovered")
				cover.classList.add("covered");
			}
		}
	});
}