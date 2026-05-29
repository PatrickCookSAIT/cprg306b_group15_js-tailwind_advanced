console.log("JS loaded");


let unitConversionMultiplier = 0.621371;

function convert() {
    const inputID = document.getElementById("inputID");
    const resultID = document.getElementById("resultID");

    const userInput = Number(inputID.value);
    const result = userInput * unitConversionMultiplier;

    resultID.innerHTML = result;
}

function swapUnits() {
    const userUnitID = document.getElementById("userUnitID");
    const resultUnitID = document.getElementById("resultUnitID");

    //the swap happens here by taking unit currently in the results portion and moving it to user portion
    const userUnit = resultUnitID.innerHTML;
    const resultUnit = userUnitID.innerHTML;

    //plug new results back in
    resultUnitID.innerHTML = resultUnit;
    userUnitID.innerHTML = userUnit;
}
window.convert = convert;
window.swapUnits - swapUnits;