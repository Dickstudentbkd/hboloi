class Car {
    constructor(brand, type, speed) {
        this.brand = brand;
        this.type = type;
        this.speed = speed;
    }
    getInfo() {
        return "Carinfo: " + this.brand + " " + this.type +  " " + this.speed;
    }
}
class Card {
    constructor(card1, card2=card1, set=card1, sound=card1){
        this.card1 = card1;
        this.card2 = card2;
        this.set = set;
        this.sound = sound;
    }
}
const myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];
const myCardSet = myCardArray.map(card => new Card(card));
console.log(myCardSet);

const myCar = new Car("Opel","Astra", 220);
console.log("mijn autmerk: " + myCar.brand);