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

function convert() {
    const inputID = document.getElementById("inputID");
    const resultID = document.getElementById("resultID");
    //find the units to set formula for conversion
    const userUnitID = document.getElementById("userUnitID");
    const userUnit = userUnitID.innerHTML;
    let unitConversionMultiplier = 1;
    let unitConversionOffset = 0;

    //unitConversionOffset only changes from 0 when temperature is involved
    if(userUnit === "KM") {
        unitConversionMultiplier = kmToMiles;
    } else if(userUnit === "MILES") {
        unitConversionMultiplier = milesToKM;
    } else if(userUnit === "kg") {
        unitConversionMultiplier = kgToLb;
    } else if(userUnit === "lbs") {
        unitConversionMultiplier = lbToKG;
    } else if(userUnit === "C") {
        unitConversionMultiplier = cToF;
        unitConversionOffset = 32;
    } else if(userUnit === "F") {
        unitConversionMultiplier = fToC;
        unitConversionOffset = -32;
    }


    const userInput = Number(inputID.value);
    const result = userInput * unitConversionMultiplier + unitConversionOffset;

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