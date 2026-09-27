// ===== SpendWise: JavaScript Foundation (Week 6) =====

// Confirms the script is linked and running
console.log("SpendWise script loaded successfully.");

// ----- 2. Store Application Data -----
// Variables representing key budgeting info
let monthlyBudget = 0;      // total budget the user sets
let expenseName = "";       // name of an expense (e.g. "Groceries")
let expenseAmount = 0;      // cost of that expense
let expenseCategory = "";   // category of the expense (e.g. "Food")
let remainingBalance = 0;   // calculated after budget - expense

// ----- 3. Collect User Input -----
function getBudgetInput() {
  // prompt() returns a string, so we convert it to a number
  monthlyBudget = parseFloat(prompt("Enter your monthly budget (KES):"));
  return monthlyBudget;
}

function getExpenseInput() {
  expenseName = prompt("Enter the expense name (e.g. Groceries):");
  expenseAmount = parseFloat(prompt("Enter the expense amount (KES):"));
  expenseCategory = prompt("Enter the expense category (e.g. Food, Transport):");
}

// ----- 4. Perform Budget Calculations -----
// ----- 5. Create Reusable Functions -----
function calculateRemainingBalance(budget, amountSpent) {
  return budget - amountSpent;
}

// ----- 6. Display Results -----
function displayResults() {
  console.log("----- SpendWise Budget Summary -----");
  console.log("Monthly Budget: KES " + monthlyBudget);
  console.log("Expense Name: " + expenseName);
  console.log("Expense Category: " + expenseCategory);
  console.log("Expense Amount: KES " + expenseAmount);
  console.log("Remaining Balance: KES " + remainingBalance);
  console.log("-------------------------------------");
}

// ----- Run the program -----
function runSpendWise() {
  getBudgetInput();
  getExpenseInput();
  remainingBalance = calculateRemainingBalance(monthlyBudget, expenseAmount);
  displayResults();
}

runSpendWise();