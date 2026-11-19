const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetDisplay = document.getElementById("budget-display");
const totalDisplay = document.getElementById("total-display");
const remainingDisplay = document.getElementById("remaining-display");
const countDisplay = document.getElementById("count-display");
const feedbackEl = document.getElementById("feedback");
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const emptyMsg = document.getElementById("empty-msg");
const categoryList = document.getElementById("category-list");

let budget = 0;
let expenses = [];

// Set the budget
budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = Number(budgetInput.value);
  if (value <= 0 || isNaN(value)) return;

  budget = value;
  budgetInput.value = "";
  render();
});

// Add an expense
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  if (name === "" || amount <= 0 || isNaN(amount)) return;

  expenses.push({ name: name, amount: amount, category: category });
  nameInput.value = "";
  amountInput.value = "";
  render();
});

// Delete an expense (event delegation on the table body)
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    deleteExpense(Number(e.target.dataset.index));
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  render();
}

// Choose the message and color using conditionals
function getFeedback(total, remaining) {
  if (budget === 0) {
    return { text: "Set a budget to get started.", cls: "feedback" };
  } else if (remaining < 0) {
    return { text: "You are over budget!", cls: "feedback bad" };
  } else if (total >= budget * 0.8) {
    return { text: "Careful, you've used 80% or more of your budget.", cls: "feedback warn" };
  } else {
    return { text: "You're on track.", cls: "feedback good" };
  }
}

// Update the whole page from the current data
function render() {
  // Total with a loop
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  const remaining = budget - total;

  budgetDisplay.textContent = "KES " + budget;
  totalDisplay.textContent = "KES " + total;
  remainingDisplay.textContent = "KES " + remaining;
  countDisplay.textContent = expenses.length;

  const fb = getFeedback(total, remaining);
  feedbackEl.textContent = fb.text;
  feedbackEl.className = fb.cls;

  // Expense table
  expenseList.innerHTML = "";
  emptyMsg.style.display = expenses.length === 0 ? "block" : "none";

  expenses.forEach(function (expense, index) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + expense.name + "</td>" +
      "<td>" + expense.category + "</td>" +
      "<td>KES " + expense.amount + "</td>" +
      "<td><button class='delete-btn' data-index='" + index + "'>Delete</button></td>";
    expenseList.appendChild(row);
  });

  // Category summary with for...of
  categoryList.innerHTML = "";
  const totals = {};
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  }
  for (const category in totals) {
    const li = document.createElement("li");
    li.textContent = category + ": KES " + totals[category];
    categoryList.appendChild(li);
  }
}

// Show the starting state on load
render();