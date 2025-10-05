// --- Global DOM Elements and State ---
const addButton = document.querySelector("#addItemBtn");
const addCont = document.querySelector("#item-cont");
const capInput = document.getElementById("cap");
const startExecBtn = document.querySelector("#startExecBtn"); // Renamed from original '#added' for clarity
const tableCont = document.querySelector("#table-cont");
const stepsCont = document.querySelector("#steps");
const currStepCont = document.querySelector('#curr-step');
const prevStepBtn = document.querySelector("#prevStep");
const nextStepBtn = document.querySelector("#nextStep");
const restartBtn = document.querySelector("#restart");
const pausePlayBtn = document.querySelector("#pausePlay");

var items = [];
var stepsData = [];     // Array to hold all calculation steps
var currentStepIndex = -1; // -1 for initial state
var capacity = 0;
var isPlaying = false;
var animationTimeout;

// --- Helper Functions ---

function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function highlight(cell, color) {
    if(cell)
        cell.style.backgroundColor = color;
}

function removeHighlight(cell) {
    if (cell)
        cell.style.backgroundColor = "";
}

// --- Item Management (Consolidated) ---

// Function to add an item row (Using the first, clean version from your code)
function addItemInput(weight="", profit="") {
    let itemRow = document.createElement("div");
    itemRow.className = "item-row";

    let wLabel = document.createElement("label");
    wLabel.innerText = "Weight";
    wLabel.className = "it-label";

    let wInput = document.createElement("input");
    wInput.type = "number";
    wInput.className = "it-ip";
    wInput.value = weight;
    wInput.min = "0";

    let pLabel = document.createElement("label");
    pLabel.innerText = "Profit";
    pLabel.className = "it-label";

    let pInput = document.createElement("input");
    pInput.type = "number";
    pInput.className = "it-ip";
    pInput.value = profit;
    pInput.min = "0";

    itemRow.appendChild(wLabel);
    itemRow.appendChild(wInput);
    itemRow.appendChild(pLabel);
    itemRow.appendChild(pInput);

    addCont.appendChild(itemRow);
    items.push({wInput, pInput});
}

// Clear items & optionally reset capacity
function clearItems() {
    addCont.innerHTML = "";
    items = [];
    capInput.value = ""; // clear capacity
    tableCont.innerHTML = "<p>Pending Execution</p>";
    stepsCont.innerHTML = "<p>Will display all steps here</p>";
    currStepCont.innerHTML = "Will display current step here";
    resetExecutionState();
}

// Default preset with capacity
const defaultPreset = {
    capacity: 10,
    items: [
        {w: 2, p: 3},
        {w: 3, p: 4},
        {w: 4, p: 5},
        {w: 5, p: 8}
    ]
};

// Load preset
function loadPreset(preset) {
    clearItems();
    capInput.value = preset.capacity;
    preset.items.forEach(item => addItemInput(item.w, item.p));
}

// --- Event Listeners for Item Management ---
window.addEventListener("load", () => loadPreset(defaultPreset));
addButton.addEventListener("click", () => addItemInput());
document.querySelector("#presetBtn").addEventListener("click", () => loadPreset(defaultPreset));
document.querySelector("#bestCaseBtn").addEventListener("click", () => {
    const best = { capacity: 6, items: [{w:1, p:1}, {w:2, p:2}, {w:3, p:3}, {w:4, p:4}] };
    loadPreset(best);
});
document.querySelector("#worstCaseBtn").addEventListener("click", () => {
    const worst = { capacity: 8, items: [{w:5, p:1}, {w:6, p:2}, {w:7, p:2}, {w:8, p:3}] };
    loadPreset(worst);
});
document.querySelector("#clearBtn").addEventListener("click", clearItems);

// --- Table Creation (Your original logic) ---

function tableCreate(items, c) {
    const table = document.createElement("table");
    
    const headerRow = document.createElement("tr");
    // Column headers (Capacity 0 to C)
    for(let i = 0; i<=c+1; i++)
    {
        const rowVal = document.createElement("th")
        // i=0 is item index, i=1 is capacity 0
        rowVal.innerText = i === 0 ? "Item" : i - 1; 
        headerRow.appendChild(rowVal)
    }
    table.appendChild(headerRow);

    let rh = 0; // Item index identifier
    
    // Row 0 (Base Case: No items)
    let row0 = document.createElement("tr");
    for(let i = 0; i<=c+1; i++)
    {
        const rowVal = document.createElement("td")
        if(i == 0)
        {
            rowVal.innerText = rh;
        }
        else
            rowVal.innerText = "0";
        row0.appendChild(rowVal);
    }
    table.appendChild(row0);
    rh++;
    
    // Item rows (1 to N)
    items.forEach(item => {
        let row = document.createElement("tr");
        for(let i = 0; i<=c+1; i++)
        {
            const rowVal = document.createElement("td")
            if(i == 0)
            {
                rowVal.innerText = rh; // Display item index
            }
            else
                rowVal.innerText = "0";
            row.appendChild(rowVal);
        }
        rh++;
        table.appendChild(row);
    });

    return table;
}

// --- NEW LOGIC: Step Generation (Non-visual) ---

// Replaced the core logic of knapsackTable to generate steps instead of executing them
function generateSteps(items, c) {
    const steps = [];
    const dp = Array(items.length+1).fill(0).map(() => Array(c+1).fill(0));

    for(let i = 1; i<=items.length; i++)
    {
        const w = Number(items[i-1].wInput.value)
        const p = Number(items[i-1].pInput.value)

        for(let j = 0; j<=c; j++)
        {
            const step = {
                itemIndex: i, 
                capIndex: j,  
                description: "",
                highlights: [], // [ [row, col, color], ... ] (DP indices)
                dpState: []     // DP table state after this calculation
            };

            // HTML table row and column indices for visualization (i+1, j+1)
            const htmlr = i+1;
            const htmlc = j+1;
            
            // Highlight current cell (Your original color: #b5aca3)
            step.highlights.push([htmlr, htmlc, "#8a5545ca"]);

            if(w <= j)
            {
                const includeVal = dp[i - 1][j - w] + p;
                const excludeVal = dp[i - 1][j];

                // Previous DP row is the HTML row index `i` (DP row i-1)
                const includeHTMLR = i; 
                const excludeHTMLR = i;

                // Previous capacity column indices
                const includeHTMLC = j - w + 1; 
                const excludeHTMLC = j + 1; 

                // Highlight source cells (Your original colors: #b0d2ec and #648ec0)
                step.highlights.push([includeHTMLR, includeHTMLC, "#b0d2ec"]); // Include
                step.highlights.push([excludeHTMLR, excludeHTMLC, "#648ec0"]); // Exclude
                
                dp[i][j] = Math.max(includeVal, excludeVal);

                step.description = `<p>Considering item ${i} (w=${w}, p=${p}), capacity ${j}: <br>
                Include → ${includeVal} (from DP[${i-1}][${j-w}]), Exclude → ${excludeVal} (from DP[${i-1}][${j}]) <br>
                Selected max = ${dp[i][j]}</p>`;
            }
            else
            {
                dp[i][j] = dp[i - 1][j];

                const excludeHTMLR = i;
                const excludeHTMLC = j + 1;

                // Highlight carry forward cell (Your original color: #648ec0)
                step.highlights.push([excludeHTMLR, excludeHTMLC, "#648ec0"]); 

                step.description = `<p>Item ${i} (w=${w}) too heavy for capacity ${j}.
                <br>
                Carry forward = ${dp[i][j]} (from DP[${i-1}][${j}])</p>`;
            }
            
            // Deep copy the DP table state after the calculation
            step.dpState = JSON.parse(JSON.stringify(dp));
            steps.push(step);
        }
    }
    
    // Final step
    steps.push({
        itemIndex: items.length,
        capIndex: c,
        description: `<p>Final maximum profit = ${dp[items.length][c]}</p>`,
        highlights: [[items.length + 1, c + 1, "gold"]], // Final cell highlight
        dpState: JSON.parse(JSON.stringify(dp))
    });

    return steps;
}

// --- NEW LOGIC: Visualization State Machine ---

function updateVisualization() {
    const table = tableCont.querySelector('table');
    
    // 1. Reset highlights
    if (table) {
        // Clear all previous highlights
        for (let r = 1; r < table.rows.length; r++) {
            for (let c = 1; c < table.rows[r].cells.length; c++) {
                removeHighlight(table.rows[r].cells[c]);
            }
        }
    }
    
    // Update button states
    const isStart = currentStepIndex === -1;
    const isEnd = currentStepIndex === stepsData.length - 1;
    prevStepBtn.disabled = isStart || currentStepIndex === 0;
    nextStepBtn.disabled = isEnd;
    restartBtn.disabled = isStart;
    pausePlayBtn.innerText = isPlaying ? "Pause" : "Play";

    if (isStart) {
        currStepCont.innerHTML = "Click 'Next' or 'Play' to begin the step-by-step DP calculation.";
        stepsCont.innerHTML = "<p>Will display all steps here</p>";
        return;
    }

    const currentStep = stepsData[currentStepIndex];

    // 2. Update DP Table cells
    if (table) {
        const currentDP = currentStep.dpState;
        // DP rows (0 to N) maps to HTML rows (1 to N+1)
        for (let r = 0; r < currentDP.length; r++) { 
            // DP cols (0 to C) maps to HTML cols (1 to C+1)
            for (let c = 0; c < currentDP[0].length; c++) {
                // HTML cell index: r+1, c+1
                if(table.rows[r + 1] && table.rows[r + 1].cells[c + 1]) {
                    table.rows[r + 1].cells[c + 1].innerText = currentDP[r][c];
                }
            }
        }
    }

    // 3. Apply Highlighting
    currentStep.highlights.forEach(([r, c, color]) => {
        // r, c are HTML table indices (row/column)
        if (table && table.rows[r] && table.rows[r].cells[c]) {
            highlight(table.rows[r].cells[c], color);
        }
    });

    // 4. Update Steps Log
    currStepCont.innerHTML = currentStep.description;
    
    // Rebuild the log to reflect current index
    stepsCont.innerHTML = "";
    for (let i = 0; i <= currentStepIndex; i++) {
        const log = stepsData[i];
        const logP = document.createElement("p");
        logP.innerHTML = log.description.replace(/<p>|<\/p>/g, ''); // Clean up internal <p> tags
        
        if (i === currentStepIndex) {
            logP.style.backgroundColor = '#b0d2ec60'; // Highlight current step in the log
        }
        stepsCont.appendChild(logP);
    }
    stepsCont.scrollTop = stepsCont.scrollHeight;
}


// --- Navigation Handlers ---

function nextStepHandler() {
    stopAutoplay();
    if (currentStepIndex < stepsData.length - 1) {
        currentStepIndex++;
        updateVisualization();
    }
}

function prevStepHandler() {
    stopAutoplay();
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateVisualization();
    } else if (currentStepIndex === 0) {
        currentStepIndex = -1;
        updateVisualization(); // Go back to initialized state
    }
}

function restartHandler() {
    stopAutoplay();
    currentStepIndex = -1;
    
    // Re-create the initial table to clear all calculated values
    const table = tableCreate(items, capacity);
    tableCont.innerHTML = "";
    tableCont.appendChild(table);

    updateVisualization();
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

function startAutoplay() {
    if (currentStepIndex >= stepsData.length - 1) {
        restartHandler();
    }
    
    isPlaying = true;
    pausePlayBtn.innerText = "Pause";

    const executeStep = () => {
        if (!isPlaying || currentStepIndex >= stepsData.length - 1) {
            stopAutoplay();
            return;
        }

        currentStepIndex++;
        updateVisualization();

        animationTimeout = setTimeout(executeStep, 1000); // 1 second delay
    };

    executeStep();
}

function stopAutoplay() {
    isPlaying = false;
    clearTimeout(animationTimeout);
    pausePlayBtn.innerText = "Play";
}

function resetExecutionState() {
    currentStepIndex = -1;
    stepsData = [];
    stopAutoplay();
    prevStepBtn.disabled = true;
    nextStepBtn.disabled = true;
    restartBtn.disabled = true;
    pausePlayBtn.disabled = true;
    startExecBtn.disabled = false;
}

// --- Main Execution Handler (Replaced old async knapsackTable call) ---

// const generateTable = document.querySelector("#added"); (Original commented line)
startExecBtn.addEventListener("click", () => {
    const cap = document.getElementById("cap")
    capacity = Number(cap.value); 

    // Validation checks
    if(!capacity || capacity <= 0)
    {
        alert("Please enter the capacity, it should be greater than 0");
        cap.focus();
        return;
    }

    for(let i = 0; i < items.length; i++) {
        const w = Number(items[i].wInput.value);
        const p = Number(items[i].pInput.value);
        if(isNaN(w) || isNaN(p) || w <= 0 || p < 0)
        {
            alert(`Please fill valid weight (>0) and profit (>=0) for item ${i+1}`);
            return;
        }
    }

    // Reset UI and state
    tableCont.innerHTML = ""; // to clear old tables
    stepsCont.innerHTML = "";
    currStepCont.innerHTML = "";
    startExecBtn.disabled = true; // Disable until restart

    // 1. Create initial table
    const table = tableCreate(items, capacity);
    tableCont.appendChild(table);

    // 2. Generate all steps
    stepsData = generateSteps(items, capacity);

    // 3. Enable controls and set initial state
    nextStepBtn.disabled = false;
    restartBtn.disabled = false;
    pausePlayBtn.disabled = false;
    updateVisualization(); // Display initial instructions

    // The original logic would call: await knapsackTable(items, capacity, table);
    // This is replaced by the step-by-step control logic above.
});

// --- Attach Navigation Handlers ---
prevStepBtn.addEventListener("click", prevStepHandler);
nextStepBtn.addEventListener("click", nextStepHandler);
restartBtn.addEventListener("click", restartHandler);
pausePlayBtn.addEventListener("click", toggleAutoplay);