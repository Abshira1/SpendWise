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