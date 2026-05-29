console.log("JS loaded");

let unitConversionMultiplier = 0.621371;

function convert() {
    const inputID = document.getElementById("inputID");
    const resultID = document.getElementById("resultID");

    const userInput = Number(inputID.value);
    const result = userInput * unitConversionMultiplier;

    resultID.innerHTML = result;
}

window.convert = convert;