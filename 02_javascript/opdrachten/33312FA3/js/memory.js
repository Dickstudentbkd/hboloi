"use strict";
class Card {
    //naam set & sound = card1...
    constructor(card1, card2 = card1, set=card1, sound=card1) {
        this.card1 = card1;
        this.card2 = card2;
        this.set = set;
        this.sound = sound;
    }
}

const myField = document.getElementById("field");
myField.addEventListener("click", onClickCard);
const myChoice = document.getElementById("speelveld");
myChoice.addEventListener("change", onSelectFieldSize);
// basis array met alle mogelijke kaartjes
const myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];
// geef het document een event listener die bij het laden van de
// pagina de functie populateField aanroept
document.addEventListener("DOMContentLoaded", shuffle(myCardArray));
console.log(myCardArray);
function populateField(boardClass, iCards) {
    myField.innerHTML ="";
    const CardSetArray = shuffle(myCardArray); // shuffle basis array
    const myCustomCardArray = CardSetArray.slice(0, iCards); //aanpassen op basis van speelveld keuze
    const myCardSetOne = myCustomCardArray.map(card => new Card(card));
    const myCardSetTwo = myCustomCardArray.map(card => new Card(card));
    const myDblCardArray = myCardSetOne.concat(myCardSetTwo);
    //shuffle samengevoegde array
    const myCardSet = shuffle(myDblCardArray);
    console.log(myCardSet);
    myCardSet.forEach((item) => {
        //console.log(item);
        let newTile = document.createElement("div");
        let newCard = document.createElement("img");
        let cover = document.createElement("img");
        newTile.setAttribute("class", boardClass);
        let imageUrl = "img/" + item.card1 + ".jpg";
        newCard.setAttribute("src", imageUrl);
        newCard.setAttribute("name", item.card1);
        cover.setAttribute("src", "img/cover.png");
        cover.setAttribute("class", "covered");
        newTile.appendChild(newCard);
        newTile.appendChild(cover);
        myField.appendChild(newTile);
    });
}
function onClickCard(e) {
    if (e.target.className === "covered") {
        e.target.className = "uncovered";
        console.log(e.target.parentNode.firstChild.getAttribute("name"));
        console.log(e.target.parentNode.lastChild.getAttribute("src"));
    } else {
        e.target.parentNode.lastChild.className = "covered";
    }
}
function shuffle(array) {
    let t, i;
    let  n = array.length;
    //While there remain elements to shuffle...
    while (n) {
        // Pick a remaining element...
        i = Math.floor(Math.random() * n--);
        // and swap it with te current element...
        t = array[n];
        array[n] = array[i];
        array[i] = t;
    }
    return array;
}
function onSelectFieldSize() {
    //samenstellen van boardx. Switch is niet noodzakelijk hier...
    // (6x6)/2 =18 etc was ook mogelijk geweest. 5x5 niet zo handig speelveld met
    // 2x dezelfde kaartjes...
   // let boardClass = "board" + myChoice.value
    let selectValue = myChoice.value;
    let boardClass, iCards;
    switch(selectValue){
        case "6":
            boardClass = "board6";
            iCards = 18;
            break;
        case "5":
            boardClass = "board5";
            iCards = 12;
            break;
        case "4":
            boardClass = "board4";
            iCards = 8;
            break;
        default:
            boardClass = "board6";
            iCards = 18;
    }
    populateField(boardClass, iCards);
}
