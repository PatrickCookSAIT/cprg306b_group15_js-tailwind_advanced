// switchTab(tabName)
function switchTab(tabName) {
    // Hide all panels
    document.querySelectorAll(".tab-panel").forEach(panel => {
        panel.classList.add("hidden");
    });

    // Show the chosen panel
    const activePanel = document.getElementById("panel-" + tabName);
    if (activePanel) activePanel.classList.remove("hidden");

    // Update nav link styling — remove active style from all, add to chosen
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

// convert()
function convert() {
    // Find whichever panel is currently visible
    const activePanel = document.querySelector(".tab-panel:not(.hidden)");
    if (!activePanel) return;

    const inputEl      = activePanel.querySelector(".input-field");
    const resultEl     = activePanel.querySelector(".result-field");
    const userUnitEl   = activePanel.querySelector(".user-unit-label");
    const resultUnitEl = activePanel.querySelector(".result-unit-label");

    const userUnit   = userUnitEl.textContent.trim().toUpperCase();
    const resultUnit = resultUnitEl.textContent.trim().toUpperCase();

    // Parse single value or comma-separated list
    const parts = inputEl.value.trim().split(",").map(s => s.trim()).filter(s => s !== "");

    if (parts.length === 0) {
        resultEl.textContent = "—";
        return;
    }

    const parsed = parts.map(Number);

    // Validate — make sure every entry is a real number
    if (parsed.some(isNaN)) {
        resultEl.textContent = "Invalid input — numbers only";
        return;
    }

    const converter   = performConversion(userUnit, resultUnit);
    const inputValues = parsed.length === 1 ? parsed[0] : parsed;
    const output      = converter(inputValues);

    // Format: round to 4 decimal places, join arrays with commas
    if (Array.isArray(output)) {
        resultEl.textContent = output.map(v => parseFloat(v.toFixed(4))).join(",  ");
    } else {
        resultEl.textContent = parseFloat(output.toFixed(4));
    }
}

// swapUnits()
function swapUnits() {
    const activePanel = document.querySelector(".tab-panel:not(.hidden)");
    if (!activePanel) return;

    const userUnitEl   = activePanel.querySelector(".user-unit-label");
    const resultUnitEl = activePanel.querySelector(".result-unit-label");

    // Swap the label text between from and to
    const temp = userUnitEl.textContent;
    userUnitEl.textContent   = resultUnitEl.textContent;
    resultUnitEl.textContent = temp;

    // Clear stale result after swap
    activePanel.querySelector(".result-field").textContent = "0";
}

// Expose all functions to the global scope for inline onclick attributes
window.convert    = convert;
window.swapUnits  = swapUnits;
window.switchTab  = switchTab;