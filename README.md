# SpendWise

SpendWise is a personal budget and expense tracker built with HTML, CSS, and JavaScript. Users set a monthly budget, add expenses, and see how much they have left, with color-coded feedback when spending gets close to or goes over the budget.

## Live Website
https://spendwise-r8dg.netlify.app

## GitHub Repository
https://github.com/Abshira1/SpendWise

## Technologies Used
- HTML
- CSS (Flexbox, Grid, custom properties)
- JavaScript
- Git and GitHub

## Features
- Set a monthly budget
- Add expenses with a name, amount, and category
- See total spent, remaining balance, and number of expenses
- Color-coded feedback: over budget (red), 80% or more used (warning), on track (green)
- Delete expenses
- Spending summary by category

## Project Structure
- `index.html`: the page layout and dashboard
- `style.css`: layout, colors, and responsive design
- `script.js`: budget logic, expenses, and page updates
- `README.md`: project documentation

## Week 4: Dashboard Layout
- **CSS Grid** sets the overall layout with a sidebar, header, and main content area.
- **Flexbox** arranges the sidebar, header, and card contents.
- **CSS custom properties** on `:root` define the theme colors, so they are changed in one place.
- **Responsive design:** on screens 768px wide or smaller, the layout stacks into one column.
- **Card hover and focus effects** lift each card slightly, with keyboard focus support.
- **Dark theme:** a `prefers-color-scheme: dark` block swaps the theme colors automatically.

## Week 6: Interactive Behavior
- **Conditionals:** `getFeedback()` uses `if / else if / else` to choose the budget message and color.
- **Arrays:** expenses are stored in an `expenses` array of objects (`{ name, amount, category }`). `push()` adds an expense and `splice()` removes one.
- **Loops:** a `for` loop adds up the total, a `for...of` loop builds the category totals, and `forEach` creates the table rows.
- **DOM updates:** `render()` updates the cards, expenses table, feedback message, and category summary after every change.
- **Event listeners:** `addEventListener` handles the budget form, the expense form, and the Delete buttons. `preventDefault()` stops the page from reloading on submit.

## Challenges and How I Solved Them
- **Page reloading on form submit:** fixed with `e.preventDefault()`.
- **Delete buttons on dynamically created rows:** fixed with event delegation and a `data-index` attribute on each button.
- **Keeping the page in sync:** all display updates run in one `render()` function that is called after every change.

## Deployment (Week 7)
The site is deployed on Netlify. Every push to the GitHub repo updates the live site automatically.

## Author
Abshira