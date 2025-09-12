document.addEventListener("DOMContentLoaded", () => {
    const myInput = document.getElementById("result");
    const myOperator = document.getElementById("operator");
    let oldInput = "";
    let currentInput = "";
    let currentOperator = "";
    let display = "";

    // Alle 'buttons' ophalen en click event toevoegen
    document.querySelectorAll("#keys > div > div").forEach(btn => {
        btn.addEventListener("click", () => handleAction(btn.textContent));
    });

    //actie afvangen m.b.v. switch
    function handleAction(value) {
        switch (value) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                console.log('nummer: ' + value);
                addNumber(value);
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                console.log('operator: ' + value);
                inputOperator(value);
                break;
            case 'C':
                console.log('clear memory!');
                clearMemory();
                break;
            case '=':
                console.log('calculate');
                calculate(true);
                break;
            case '.':
                console.log('point in number');
                addPoint('.');
                break;
            default:
                console.log('Unknown action');
                break;
        }
    }

    function addNumber(clickedNumber) {
        currentInput += clickedNumber;
        currentInput = checkInput(currentInput);
        display += clickedNumber;
        myInput.value = display;
    }
    //functie die input addNumber controleert op 00, 01;
    function checkInput(input) {
        if ((input.substring(0, 1) == "0") && (input.length > 1)) {
            if (input.substring(1, 2) == "0") { //controle op 00
                return 0;
            } else if (input.substring(1, 2) !== ".") { //controle op 01 etc
                return input.substring(1, 2);
            } else {
                console.log('Input 0.1: ' + input);
                return input;
            }
        } else {
            console.log('Input: ' + input);
            return input;
        }
    }
    //functie die toevoegen van decimaal regelt...
    function addPoint(point) {
        if (currentInput.indexOf(point) === -1) { //komt niet voor; toevoegen
            if (currentInput === "") { //bij begin met . => 0.
                currentInput += "0" + point;
                display += "0" + point;
            } else {
                currentInput += point;
                display += point;
            }
            myInput.value = display;
        } //anders niets doen...
    }
    //schonen geheugen (C)
    function clearMemory() {
        myInput.value = "";
        display = "";
        myOperator.value = "";
        oldInput = "";
        currentInput = "";
        currentOperator = "";
        Result = "";
    }
    /*controle inputOperator: ingewikkelde constructie door rekening houden met het volgende:
        Voldoende gegevens aanwezig?
        na intoetsen =: berekenen + schonen geheugen; volgend getal begint opnieuw
        na intoets operator: controle of er verder doorgerekend moet worden of dat er een correctie moet plaatsvinden
        (replace)
    */
    function inputOperator(operator) {
        //is er al iets om te berekenen...
        if ((currentInput === "") && (oldInput === "")) { //nee, dan nog niets te berekenen
            console.log('geen input voor berekening');
            return;
        } else if ((currentInput !== "") && (currentOperator !== "") && (oldInput !== "")) { // berekening nog doen
            console.log('currentInput en operator nog bekend: ' + currentInput + " | " + currentOperator);
            calculate(false);
            //nog toevoegen 'operator' aan value
            display += operator;
            myInput.value = display;
            currentOperator = operator;
        } else if (currentOperator !== "") { //operator niet leeg, maar wel currentInput: replace anders +=
            display = display.replace(currentOperator, operator); // aanpassen displaytekst
            myInput.value = display;
            currentOperator = operator; //nieuwe operator
            myOperator.value = operator; //display
        } else { //standaard: getal + operator
            console.log('currentInput now: ' + currentInput);
            oldInput = currentInput;
            myOperator.value = operator; //display
            display += operator;
            myInput.value = display;
            currentInput = "";
            currentOperator = operator;
        }
    }
    // de uiteindelijke berekening met een boolean 'endOfCalculate'. Zo ja (=), dan display alvast legen
    // zodat hier niet verder mee gerekend wordt... Zo nee, dan verder met eindresultaat (operator als laatste gebruikt)
    function calculate(endOfCalculate) {
        let result = "";
        console.log('operator:' + currentOperator + '\n' + 'oldinput: ' + oldInput + '\n' + 'currentInput: ' + currentInput);
        if ((currentOperator === "") || (oldInput === "")) { //ontbrekende operator/waarde
            console.log('Geen waarde bekend voor operator of vorige input');
            return;
        }
        // berekenen m.b.v. switch
        switch (currentOperator) {
            case '+':
                result = Number(oldInput) + Number(currentInput);
                break;
            case '-':
                result = Number(oldInput) - Number(currentInput);
                break;
            case 'x':
                result = Number(oldInput) * Number(currentInput);
                break;
            case '/':
                result = Number(oldInput) / Number(currentInput);
                break;
            default:
                result = "";
        }
        display = result;
        myInput.value = display;
        if (endOfCalculate) { //= gebruikt, verder geen berekening met resultaat...
            oldInput = "";
            display = "";
        } else {
            oldInput = result;
        }
        currentInput = "";      //na berekening ""
        currentOperator = "";   //na berekening op null
        myOperator.value = "";
        console.log('operator:' + currentOperator + '\n' + 'oldinput: ' + oldInput + '\n' + 'currentInput: ' + currentInput);
    }
});
