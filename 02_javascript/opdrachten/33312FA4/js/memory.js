"use strict";
let myCardArray = [];
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

class Card {
	constructor(cardObject) {
		this.card1 = cardObject.card1;
		this.card2 = cardObject.card2;
		this.set = cardObject.set;
		this.sound = cardObject.sound;
	}
}

const myField = document.getElementById("field");
const mySelect = document.getElementById("selectFieldSize");
myField.addEventListener("click", onClickCard);
mySelect.addEventListener("change", onSelectFieldsize);
// const myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];
let boardClass;
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
		console.log(e.target.parentNode.firstChild.getAttribute("name"));
	}


}

