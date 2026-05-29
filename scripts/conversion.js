console.log("JS loaded");
//setting converstion multpliers for each
let kmToMiles = 0.621371;
let milesToKM = 1.60934;
let lbToKG = 0.43592;
let kgToLb = 2.20462;
//temperature calculation is more challenging then a simple formula
//(0 C * 9/5) + 32 = F
//(0 F - 32) * 5/9
let cToF = 9/5;
let FtoC = 5/9;
//to solve the temperature change, adding conversionOffset
//it is added to the formula
//for all weight and distance, it is set to 0. 
// for temperature it is +32 for cToF and -32 for fToC

//higher order function.
//takes fromUnitType, toUnitType and the type of operation and returns the operation with fromUnit and toUnit inserted
function performConversion(fromUnitType, toUnitType) {

    if (fromUnitType === "KM" && toUnitType === "MILES") {
        return (value) => value * kmToMiles;
    }

    if (fromUnitType === "MILES" && toUnitType === "KM") {
        return (value) => value * milesToKM;
    }

    if (fromUnitType === "KG" && toUnitType === "LBS") {
        return (value) => value * kgToLb;
    }

    if (fromUnitType === "LBS" && toUnitType === "KG") {
        return (value) => value * lbToKG;
    }

    if (fromUnitType === "C" && toUnitType === "F") {
        return (value) => value * cToF + 32;
    }

    if (fromUnitType === "F" && toUnitType === "C") {
        return (value) => (value - 32) * fToC;
    }
}

*/

function convert() {
    const inputID = document.getElementById("inputID");
    const resultID = document.getElementById("resultID");

    const userUnitID = document.getElementById("userUnitID");
    const resultUnitID = document.getElementById("resultUnitID");

    const userUnit = userUnitID.innerHTML.trim().toUpperCase();
    const resultUnit = resultUnitID.innerHTML.trim().toUpperCase();

    const converter = performConversion(userUnit, resultUnit);

    const userInput = Number(inputID.value);
    const result = converter(userInput);

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
window.swapUnits = swapUnits;