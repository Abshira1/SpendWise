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

// ===== Data (arrays store multiple records) =====
let budget = 0;
let expenses = [];

// ===== DOM references =====
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const emptyMsg = document.getElementById("empty-msg");
const categoryList = document.getElementById("category-list");
const feedback = document.getElementById("feedback");

// ===== Loops: process stored records =====
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

function totalsByCategory() {
  const totals = {};
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }
  return totals;
}

// ===== Conditionals: budgeting feedback =====
function getFeedback(total) {
  if (budget === 0) {
    return { text: "Set a budget to get started.", level: "" };
  }
  const percent = (total / budget) * 100;
  if (total > budget) {
    return { text: "Over budget by KES " + (total - budget) + ". Time to cut back!", level: "bad" };
  } else if (percent >= 80) {
    return { text: "Careful! You've used " + percent.toFixed(0) + "% of your budget.", level: "warn" };
  } else {
    return { text: "You're doing well. " + percent.toFixed(0) + "% of your budget used.", level: "good" };
  }
}

// ===== DOM updates =====
function render() {
  const total = calculateTotal();

  document.getElementById("budget-display").textContent = "KES " + budget;
  document.getElementById("total-display").textContent = "KES " + total;
  document.getElementById("remaining-display").textContent = "KES " + (budget - total);
  document.getElementById("count-display").textContent = expenses.length;

  const result = getFeedback(total);
  feedback.textContent = result.text;
  feedback.className = "feedback " + result.level;

  expenseList.innerHTML = "";
  expenses.forEach(function (expense, index) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + expense.name + "</td>" +
      "<td>" + expense.category + "</td>" +
      "<td>KES " + expense.amount + "</td>" +
      '<td><button class="delete-btn" data-index="' + index + '">Delete</button></td>';
    expenseList.appendChild(row);
  });
  emptyMsg.style.display = expenses.length === 0 ? "block" : "none";

  categoryList.innerHTML = "";
  const totals = totalsByCategory();
  for (const category in totals) {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + category + "</span><span>KES " + totals[category] + "</span>";
    categoryList.appendChild(li);
  }
}

// ===== Events: user interactions =====
budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  budget = Number(budgetInput.value);
  budgetForm.reset();
  render();
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  if (name === "" || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }
  expenses.push({ name: name, amount: amount, category: categoryInput.value });
  expenseForm.reset();
  render();
});

expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    expenses.splice(Number(e.target.dataset.index), 1);
    render();
  }
});

render();