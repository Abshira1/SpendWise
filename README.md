# SpendWise — Dashboard Shell (Week 4)

This week rebuilds SpendWise's layout as a dashboard shell using CSS Grid and Flexbox, with no functionality yet — just a clean, responsive visual structure.

## What I built

- **`index.html`** — the dashboard markup: a sidebar, a header, and six category cards with static, realistic financial content (Food, Transport, Rent, Entertainment, Savings, Utilities).
- **`style.css`** — all layout and styling, including the theme variables.
- **`README.md`** — this file.

## How it's structured

### Overall layout — CSS Grid
The `.dashboard` element is a CSS Grid with named areas:
```
"sidebar header"
"sidebar main"
```
This lays out the sidebar down the left side and stacks the header above the main content on the right, all without any absolute positioning. On small screens (≤720px) the grid switches to a single column and stacks header → sidebar → main.

### Internal arrangement — Flexbox
- **Sidebar**: a flex column holding the brand mark, the nav links, and a footer link, so they space out evenly from top to bottom.
- **Header**: a flex row with `justify-content: space-between`, splitting the page title on the left from the total spent, "Add Expense" button, and avatar on the right.
- **Each card**: a flex column internally (icon/trend row, category name, amount, sub-label), while the six cards themselves sit in a CSS Grid (`repeat(auto-fit, minmax(220px, 1fr))`) so they wrap responsively.

### Theme — CSS custom properties
All colors are defined once on `:root` in `style.css` and reused throughout:
- `--color-brand` — deep teal, used for the sidebar and primary button
- `--color-accent` — warm gold, used for the brand mark and avatar
- `--color-surface` — the page background
- `--color-card` — card and header background
- `--color-text-primary` / `--color-text-secondary` — main and muted text
- A set of soft tint variables (`--color-food-bg`, `--color-transport-bg`, etc.) for each category icon's background

### Responsive design
A media query at `max-width: 768px` collapses the grid to a single column — the header moves to the top, followed by the sidebar, then the main content — and the card grid drops to one column per row. Verified using the browser's DevTools Device Toolbar.

### Card micro-interactions
Each card has a `transition` on `transform` and `box-shadow` (200ms, under the 250ms limit). On `:hover` and `:focus-within`, a card lifts slightly (`translateY(-4px)`) and gains a soft shadow. Cards have `tabindex="0"` so they're reachable by keyboard, and `:focus-within` also adds a visible accent-colored outline for keyboard users.

### Stretch goal: dark theme
A `@media (prefers-color-scheme: dark)` block overrides only the `:root` custom properties (brand, accent, surface, card, text, border, category tints, and up/down trend colors) with darker equivalents. Because every other rule in the stylesheet references these variables rather than hard-coded colors, the whole dashboard switches themes automatically based on the user's system preference — no other CSS changes needed.

## Not included (by design)
No JavaScript and no real data wiring — this is purely the visual shell. Functionality (adding expenses, calculating totals, etc.) comes in a later week.

## Week 6: JavaScript Foundation

# SpendWise

SpendWise is a personal budget and expense tracker web app. It lets a user view spending by category (Food, Transport, Rent, etc.), compare spending against budgets, and now — as of this week — collect and process real budget data using JavaScript.

## What This Project Does

SpendWise displays a dashboard overview of monthly spending across categories. This week's update adds the JavaScript logic that lets the app collect a user's monthly budget and a single expense, calculate the user's remaining balance, and display the results.

## JavaScript Concepts Implemented

- **Variables** — storing budget and expense data
- **Data types** — numbers (budget/amount) and strings (name/category)
- **User input** — collected via `prompt()`
- **Calculations** — subtracting expenses from the budget
- **Functions** — organizing the app's logic into reusable pieces

## How Variables Are Used

Variables such as `monthlyBudget`, `expenseName`, `expenseAmount`, `expenseCategory`, and `remainingBalance` store the key budgeting information the app works with. These are declared at the top of `script.js` and updated as the user provides input.

## How User Input Is Collected

The app uses JavaScript's `prompt()` function to ask the user for their monthly budget, the name of an expense, its amount, and its category. Each response is stored in the matching variable so it can be used in calculations later.

## How Calculations Are Performed

The `calculateRemainingBalance()` function takes the budget and the expense amount, then subtracts one from the other to determine how much money is left. This keeps the math logic separate from the rest of the app.

## How Functions Help Organize the Code

The code is split into focused, reusable functions:
- `getBudgetInput()` — collects the budget from the user
- `getExpenseInput()` — collects the expense details from the user
- `calculateRemainingBalance()` — performs the budget calculation
- `displayResults()` — logs a clearly labeled summary to the console
- `runSpendWise()` — runs the above functions in order

This structure keeps each part of the program doing one job, making the code easier to read, test, and expand later.