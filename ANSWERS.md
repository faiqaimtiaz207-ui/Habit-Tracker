# ANSWERS.md

---

## 1. How to Run the App

**What you need first:** Node.js 18 or newer, npm 9 or newer (they come together, so download Node and you're good).

**To run it locally:**
```bash
npm install
npm run dev
```

Then open your browser and go to [http://localhost:5173](http://localhost:5173). You should see the habit tracker app.

**To build for the web:**
```bash
npm run build
npm run preview
```

This creates a production version that's optimized and ready to deploy to the internet.

---

## 2. Stack & Design Choices

**What I Used: React 18 + Vite + Regular CSS (No frameworks like Tailwind)**

Why React? The app has a lot of moving parts — the week you're viewing, your list of habits, and which days you've checked off. React keeps all these pieces working together smoothly. When you click a checkbox, the whole grid updates instantly. When you switch weeks, the calendar changes without confusion. Vite is the build tool that makes development super fast — I could change the layout and see it refresh in my browser immediately.

Why no Tailwind or component libraries? This app is all about the design. The colors, spacing, and layout are very intentional. If I used utility classes or pre-built components, that careful design would get hidden. I wanted to write clean CSS that anyone can read.

**Design Choice 1 — Clean white background with bright lime-green checkmarks**

The most important thing about a habit tracker is: can you instantly see which days you completed your habit? I used a white background so the bright lime-green (#c8f564) checkmarks pop off the screen and grab your attention immediately. Everything else is neutral colors (grays and blacks), so your eye naturally goes to the green checked boxes and the streak numbers. The day you're looking at (today) gets a very light green tint so you always know where you are in the week without thinking about it.

**Design Choice 2 — Checkboxes stay the same size, habit names stretch**

I used a CSS trick (called Grid) to make sure the checkboxes are always 44 pixels wide and perfectly aligned, no matter how long your habit name is. If your habit is called "Practice piano for 30 minutes," the checkbox size doesn't change — only the name text gets shorter with "...". This keeps the table neat and easy to scan, whether you have 3 habits or 20.

**Why Monday is the first day of the week** — Most of us think about habits around our work/school week. Monday to Sunday makes sense because all the "busy days" (Mon–Fri) are on the left side where you look first, and the weekend is clearly grouped on the right. This makes it easier to see your weekly patterns at a glance.

---

## 3. Mobile-Friendly & Accessible Design

**How it works on different screen sizes:**

On your **phone (360px wide)**, the checkboxes shrink a little bit (26px instead of 44px), the labels get smaller, and everything gets tighter. But the full 7-day week is still visible — I didn't hide any days, because the whole point is to see your whole week at a glance. If your habit name is long, it gets cut off with "...", which is a fair tradeoff on a small screen.

On your **desktop (1440px wide)**, everything has plenty of breathing room. The habit name column grows to fill the space, checkboxes stay big and easy to click, and there's no wasted empty space. The table looks perfectly balanced.

**Making it keyboard-friendly:**

You can use your keyboard to navigate the whole app. Press Tab to move between buttons, Enter or Space to click them. When you tab to something, you see a clear lime-green outline so you know where you are. (Mouse users don't see the outline when they click, so the interface stays clean for them.)

Every button that only shows an icon (like the delete button) has a text label attached so screen readers can say what it does. The checkboxes tell screen readers if they're checked or not. The whole grid is organized with proper HTML roles (`role="grid"`, `role="row"`, etc.) so assistive technology understands the structure.

**One thing I didn't get to:**

Ideally, if you have a very long list of habits, there should be a "skip to habits" link at the top of the page so keyboard users don't have to tab through the header every time. I skipped this because the app is small and this was a lower priority than the other accessibility features.

---

## 4. Where I Got Help from AI

I used Claude AI in a few places to speed things up:

**a) Getting the project started**
Claude helped me set up the React + Vite folder structure. I took what it gave me and then reorganized it myself because I wanted the code to be clear and easy to navigate. I split things into `/components` and `/hooks` folders so each part has a specific job.

**b) The streak calculation**
I asked Claude to write the code that counts "how many days in a row have you done this habit?" It gave me something that worked, but I tweaked it. The original would say your streak was 0 if you hadn't checked today yet, even if it's still morning. I changed it so your streak only resets at midnight — because it's not fair to lose your streak just because you haven't opened the app yet today.

**c) The grid layout**
I was trying to figure out how to keep the checkboxes always the same size while letting the habit names stretch or shrink. Claude suggested one approach, but I improved it. I used `minmax()` to make the layout smarter — habit names can be small or large depending on your screen size, and the checkboxes always stay perfect.

---

## 5. What Could Be Better

**The weak spot:** On your phone with lots of habits (10+), it's hard to see the full habit name if it's long. The text gets cut off with "...", but you can't see the full name unless you tap to rename it. On desktop, you can hover your mouse to see the full name, but on mobile there's no hover.

**What I'd do next:** Add a swipe-left gesture (like in iOS Mail) to show a delete or rename menu for each habit. Also, I'd add a quick summary at the top like "You've completed 3 out of 5 habits today" so on a small phone screen you don't have to look at the whole grid to feel like you know how you're doing.
