document.getElementById("mySlider").oninput = checkSliderValue;
const mySlider = document.getElementById('mySlider');
const staffelTabel = document.getElementById('staffeltabel');
const output = document.getElementById("output");
const boeteKop = document.getElementById('boetekop');
const boeteBalk = document.getElementById('boetebalk');
const boeteBedrag = document.getElementById('boetebedrag');
const feedBack = document.getElementById('feedback');
const staffelArray = [28, 35, 43, 49, 56, 64, 72, 98, 107, 118, 127, 137, 147, 158, 170,
                        181, 194, 207, 221, 235, 247, 263, 277, 295, 309, 325];
let staffelTabelTot = "<tr><th>Te hard (km)</th><th>Boetebedrag</th></tr>";
let speed, speedCorrection, teller;
for (i=0;i<staffelArray.length;i++) {
    staffelTabelTot += "<tr><td>" + (Number(i) + 4) + "km</td><td>€ " + staffelArray[i] + "</td></tr>";
}
staffelTabel.innerHTML = staffelTabelTot;

// mySlider.value = 100;

function checkSliderValue(e) {
    speed = e.target.value;
    output.value = speed;
    speedCorrection = speed-53;
    feedBack.innerText = speedCorrection;
    feedBack.style.visibility = "visible";
    if (speedCorrection>4) {
        teller = Number(speedCorrection)-4;
        boeteBedrag.style.visibility = "visible";
        boeteBedrag.innerHTML = staffelArray[teller];
    }
}