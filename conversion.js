/*
 * Created by: 
 * James (Ash) Burn, Patrick Cook, Anne-Marie Dorscht
 *
 * Date: 
 * May 30th, 2026
 *
 * Program: 
 * Unit converter
 *
 * Description: 
 * This program is used to convert various measurement units. 
 * It provides kg to lb, km to miles, Celsius to Fahrenheit and the reverse of each conversion as well.
 * The user is able to input a single value or a comma seperated list, the user can then press a button to convert the units.
 * The user may also press a button to swap the units being converted.
 * The program detects the user input, makes sure that the values are all numbers, and selects the appropriate conversion formula. 
 * Afterwards each value has the formula applied and the results are displayed to the user. 
 * If the user inputs an invalid input the program will instead print an appropriate error message.
*/

console.log("JS loaded");

//setting converstion multpliers for each
let kmToMiles = 0.621371;
let milesToKM = 1.60934;
let lbToKG = 0.453592;  // BUG FIX: was 0.43592
let kgToLb = 2.20462;
//temperature calculation is more challenging then a simple formula
//(0 C * 9/5) + 32 = F
//(0 F - 32) * 5/9
let cToF = 9 / 5;
let FtoC = 5 / 9;
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
    return (value) => (value - 32) * FtoC;  // BUG FIX: was fToC (undefined)
  }
}

function convert_original() {
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

function swapUnits_original() {
  const userUnitID = document.getElementById("userUnitID");
  const resultUnitID = document.getElementById("resultUnitID");
  //the swap happens here by taking unit currently in the results portion and moving it to user portion
  const userUnit = resultUnitID.innerHTML;
  const resultUnit = userUnitID.innerHTML;

  //plug new results back in
  resultUnitID.innerHTML = resultUnit;
  userUnitID.innerHTML = userUnit;
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  const activePanel = document.getElementById("panel-" + tabName);
  if (activePanel) activePanel.classList.remove("hidden");

  document.querySelectorAll(".tab-link").forEach(link => {
    link.classList.remove("text-blue-600", "border-b-2", "border-blue-600", "font-semibold");
    link.classList.add("text-gray-500");
  });

  const activeLink = document.getElementById("tab-" + tabName);
  if (activeLink) {
    activeLink.classList.remove("text-gray-500");
    activeLink.classList.add("text-blue-600", "border-b-2", "border-blue-600", "font-semibold");
  }
}

function convert() {
  const activePanel = document.querySelector(".tab-panel:not(.hidden)");
  if (!activePanel) return;

  const inputEl = activePanel.querySelector(".input-field");
  const resultEl = activePanel.querySelector(".result-field");
  const userUnitEl = activePanel.querySelector(".user-unit-label");
  const resultUnitEl = activePanel.querySelector(".result-unit-label");

  const userUnit = userUnitEl.textContent.trim().toUpperCase();
  const resultUnit = resultUnitEl.textContent.trim().toUpperCase();

  // Parse single value or comma-separated list
  const parts = inputEl.value.trim().split(",").map(s => s.trim()).filter(s => s !== "");

  if (parts.length === 0) { resultEl.textContent = "—"; return; }

  const parsed = parts.map(Number);

  if (parsed.some(isNaN)) {
    resultEl.textContent = "Invalid input — numbers only";
    return;
  }

  // Throws an error if attempting to use a negative number for distance/weight. 
  if (parsed.some(v => v < 0) && activePanel.id !== "panel-temperature") {
    resultEl.textContent = "Invalid input - value cannot be negative";
    return;
  }

  const converter = performConversion(userUnit, resultUnit);

  if (!converter) {
    resultEl.textContent = "Unsupported conversion";
    return;
  }

  // Run each value through the converter individually, then join results
  if (parsed.length === 1) {
    resultEl.textContent = parseFloat(converter(parsed[0]).toFixed(4));
  } else {
    const output = parsed.map(v => parseFloat(converter(v).toFixed(4)));
    resultEl.textContent = output.join(",  ");
  }
}

function swapUnits() {
  const activePanel = document.querySelector(".tab-panel:not(.hidden)");
  if (!activePanel) return;

  const userUnitEl = activePanel.querySelector(".user-unit-label");
  const resultUnitEl = activePanel.querySelector(".result-unit-label");

  const temp = userUnitEl.textContent;
  userUnitEl.textContent = resultUnitEl.textContent;
  resultUnitEl.textContent = temp;

  activePanel.querySelector(".result-field").textContent = "0";
}

window.convert = convert;
window.swapUnits = swapUnits;
window.switchTab = switchTab;
