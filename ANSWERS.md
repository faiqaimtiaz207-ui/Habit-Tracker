# ANSWERS.md

---

## 1. How to Run

**Prerequisites:** Node.js 18+, npm 9+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

To build for production:
```bash
npm run build
npm run preview
```

---

## 2. Stack & Design Choices

**Stack: React 18 + Vite + plain CSS (no component library, no Tailwind)**

I chose React because the UI has several pieces of independent state that need to stay in sync — the week offset, the habit list, and the checked state all live in different places but drive the same grid. React's component model makes those relationships explicit and easy to follow. Vite gives near-instant HMR during development, which mattered a lot when I was iterating on the grid layout.

I deliberately avoided Tailwind and UI libraries. For a visual-design-heavy submission like this, utility classes would have obscured the intentional design decisions. Every CSS property I wrote is there on purpose.

**Design decision 1 — Dark background with a single lime-green accent (`#c8f564`)**

The grid lives or dies on whether you can instantly see "checked vs unchecked." I chose a dark background (`#0f0f11`) so the bright lime checkmarks have maximum contrast against the surface. Every other color in the interface is desaturated — the accent is the only saturated hue. This means your eye goes exactly where the data is: to the checked cells and the streak count. The today column gets a subtle tint of the same accent color so you always know where you are in the week at a glance.

*This affects: the entire grid, specifically the `check-btn.checked` state and the `today` column highlight.*

**Design decision 2 — Fixed 44px day columns with a flexible habit name column**

I used CSS Grid with `grid-template-columns: minmax(140px, 1fr) repeat(7, 44px) 60px`. The day columns are fixed-width so the checkboxes are always the same size and aligned perfectly regardless of how long the habit names are. The habit name column gets all the leftover space and truncates with an ellipsis if needed. This means the grid stays usable whether you have 3 habits or 15 — the checkboxes don't shift, the streak column doesn't move, and everything reads as a proper data table.

*This affects: the `.grid-header` and `.habit-row` layout across all screen sizes.*

**Week starts on Monday** because I track habits around work/school weeks. A Monday–Sunday week keeps the "productive days" (Mon–Fri) on the left where your eye lands first, and the weekend is clearly a distinct block on the right. Starting on Sunday would put Sunday and Saturday on opposite ends of the row, which fragments the weekend visually and makes it harder to reason about "how did I do this weekend."

---

## 3. Responsive & Accessibility

**Responsive behavior:**

On a **360px phone**, the grid column template shrinks to `minmax(90px, 1fr) repeat(7, 34px) 44px`. Checkboxes drop from 32px to 26px, day labels shrink slightly, and horizontal padding is reduced. The full 7-day grid stays visible — I deliberately chose not to hide days on mobile because hiding days would break the core promise of the app (see your whole week at a glance). The habit name truncates if it's long, which is an acceptable tradeoff.

On a **1440px laptop**, the grid column expands naturally — the habit name column grows via `minmax` and the rest stays proportional. There's no wasted space and no stretched checkboxes.

**Accessibility — what I handled:**

Keyboard navigation is fully supported throughout. Every interactive element (add button, day checkboxes, habit name rename button, delete button, week nav) is reachable and operable with Tab and Enter/Space. I used `:focus-visible` (not `:focus`) so keyboard users get a clear lime outline while mouse users don't see distracting rings on click. ARIA labels are on all icon-only buttons (`aria-label="Delete habit: Exercise"`). The check buttons use `aria-pressed` to communicate their toggled state to screen readers. The grid uses `role="grid"`, `role="row"`, `role="columnheader"`, `role="rowheader"`, and `role="gridcell"` for semantic structure.

**Accessibility — what I knowingly skipped:**

I did not add a skip-to-content link. On a long habits list, a keyboard user would need to Tab through the header and nav before reaching the grid. With more time I'd add a visually hidden `<a href="#grid">Skip to grid</a>` at the top of the page. I skipped it because the app is single-page and relatively shallow — it's a lower-priority gap than the grid semantics I did implement.

---

## 4. AI Usage

I used Claude (claude.ai) during this project in the following places:

**a) Initial project scaffolding**
I asked Claude to generate the folder structure and boilerplate for a React + Vite project without Tailwind. It gave me a standard setup. I kept it mostly as-is but removed the default Vite demo content and reorganized the `src/` folder into `components/` and `hooks/` myself, because I wanted the separation of concerns to be explicit.

**b) The streak calculation logic in `useHabits.js`**
I asked Claude to write a function that calculates a consecutive-day streak. It gave me a version that always started from today and stopped if today was unchecked. I changed it so that if today is unchecked, it still looks backward from yesterday — because it's often not yet the end of the day when you open the app, and a streak of 0 just because you haven't ticked today yet felt punishing and inaccurate. The actual behavior users experience is: your streak survives today being unchecked until midnight.

**c) CSS Grid column definition**
I asked for help thinking through how to keep day columns fixed-width while letting the habit name be flexible. The AI suggested `grid-template-columns: 200px repeat(7, 1fr) 80px`. I changed it to `minmax(140px, 1fr) repeat(7, 44px) 60px` because fixed `1fr` day columns would stretch awkwardly on wide screens, and a fixed 200px name column would overflow on 360px phones. The `minmax` approach is more robust across screen sizes.

---

## 5. Honest Gap

The weakest part of my submission is the **mobile experience when a user has many habits (10+)**. The habit name cell truncates with an ellipsis, but there's no way to see the full name without entering rename mode. On desktop, hovering reveals the delete button and a title tooltip, but on mobile there's no hover state, so the delete button only appears after you've already tapped into the name.

With another day, I'd add a long-press or swipe-left gesture on mobile to reveal a delete/rename action menu for each habit row, similar to how iOS handles list items. I'd also consider adding a small "today's completion" summary line at the top — e.g., "3 of 5 habits done today" — because on a narrow phone the grid can feel dense and a quick summary gives the user confidence without scanning the whole table.
