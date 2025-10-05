# 0/1 Knapsack Problem Interactive Visualization (ISE Part 1)

This project provides a **step-by-step visualization** of the **0/1 Knapsack Problem** solved using **Dynamic Programming**.

---

## Project Structure

The submission contains the following core files:

```
.
├── index.html       
├── style.css         
├── script.js         
├── ProjectReport.pdf
├── DemoVideo.pdf      
└── README.md         
```

---

## Run Instructions

This application is implemented entirely using **front-end web technologies** (HTML, CSS, JavaScript) and requires **no external libraries or server setup**.

### Using a Web Browser

1. **Locate the file:**
   Find the `index.html` file in the project folder.

2. **Open in Browser:**
   Double-click the `index.html` file. It will automatically open in your default web browser (Chrome, Firefox, Edge, etc.).

3. **Start Visualization:**
   The app is ready to use immediately.

---

## How to Use the Visualization

### Select / Enter Input

* **User-Defined:**
  Modify the **Knapsack Capacity** and use the **"Add Item"** button to define your own test case.

* **Preset:**
  Click the **"Preset"** button to run a predefined example.

* **Worst and Best Case:**
  Click the **"Best Case"** or **"Worst Case"** button to generate respective scenarios.

* **Load Data:**
  Click the **"Generate Table & Start"** button to initialize the **DP table structure** based on the current inputs.

---

### Execution

* **Step-by-Step:**
  Click **"Next"** to calculate one cell of the DP table at a time.

* **Automatic Play:**
  Click **"Play / Pause"** to watch the algorithm fill the table automatically.

* **Observe:**
  Watch the **DP table highlights** and read the **Decision Logic panel** for an explanation of whether the current item was **included** or **excluded**.

---

## Key Variables

| Variable / Element | Description                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **DP Table**       | The `DP[i][w]` array showing the maximum value for item `i` and capacity `w`.                             |
| **Logic Display**  | Output explaining the comparison of `Value(Exclude)` vs. `Value(Include)`.                                |
| **Highlights**     | Visually tracks the current cell being computed and the two source cells used in the recurrence relation. |
| **Inputs**         | Current **Knapsack Capacity (W)** and the list of available items (**Weight**, **Value**).                |

