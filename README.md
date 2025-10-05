0/1 Knapsack Problem Interactive Visualization (ISE Part 1)
This project provides a step-by-step visualization of the 0/1 Knapsack Problem solved using Dynamic Programming. It was developed to meet the requirements of the Computer Algorithm (7CS203) ISE Part 1 assignment.

1. Project Structure
The submission contains the following core files:
.
├── index.html        # Main structure and user interface
├── style.css         # Styling
├── script.js         # Core logic and visualization 
├── report.md         # Project Report (required deliverable)
└── README.md         # This file (run instructions)

2. Run Instructions
This application is implemented entirely using front-end web technologies (HTML, CSS, JavaScript) and requires no external libraries or server setup.

Using a Web Browser
Locate the file: Find the index.html file in the project folder.

Open in Browser: Double-click the index.html file. It will automatically open in your default web browser (Chrome, Firefox, Edge, etc.).

Start Visualization: The app is ready to use immediately.

3. How to Use the Visualization
Select/Enter Input:

User-Defined: Modify the Knapsack Capacity and use the "Add Item" button to define your own test case.

Preset: Click the "Preset" button run the predefined example.

Worst and Best Case: Click the "Best Case" and button to generate a Best and Worst Case Scenarios.

Load Data: Click the "Load Data" button to initialize the DP table structure based on the current inputs.

Execute Algorithm:

Step-by-Step: Click "Step Forward" to calculate one cell of the DP table at a time.

Automatic Play: Click "Play / Pause" to watch the algorithm fill the table automatically.

Observe: Watch the DP table highlights and read the Decision Logic panel for a detailed explanation of whether the current item was included or excluded.

4. Key Variables Displayed
Variable / Element

Description

DP Table

The DP[i][w] array showing the maximum value for item i and capacity w.

Logic Display

Textual output explaining the comparison of Value(Exclude) vs. Value(Include).

Highlights

Visually tracks the current cell being computed and the two source cells used in the recurrence relation.

Inputs

Current Knapsack Capacity (W) and the list of available items (Weight, Value).