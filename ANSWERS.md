# ANSWERS.md

---

## 1. How to Run the App

**Live URL:** https://habit-tracker-two-lyart.vercel.app/

**GitHub:** https://github.com/faiqaimtiaz207-ui/Habit-Tracker

**What you need first:** Node.js 18 or newer, npm 9 or newer (they come together, so download Node and you're good).

**To run it locally:**
```bash
npm install
npm run dev
```

Then open your browser and go to [http://localhost:5173](http://localhost:5173). You should see the habit tracker app.

---

## 2. Stack & Design Choices

**What I Used: React 18 + Vite + Regular CSS (No frameworks like Tailwind)**

Why React? The app has a lot of moving parts, the week you're viewing, your list of habits, and which days you've checked off. React keeps all these pieces working together smoothly. When you click a checkbox, the whole grid updates instantly. When you switch weeks, the calendar changes without confusion. Vite is the build tool that makes development super fast. I could change the layout and see it refresh in my browser immediately.

**Design Choice 1 - Clean white background with bright lime-green checkmarks**

The most important thing about a habit tracker is: can you instantly see which days you completed your habit? I used a white background so the bright lime-green (#c8f564) checkmarks pop off the screen and grab your attention immediately. Everything else is neutral colors (grays and blacks). The day you're looking at (today) gets a very light green tint so you always know where you are in the week without thinking about it.

**Design Choice 2 - Checkboxes stay the same size, habit names stretch**

I used a CSS trick (called Grid) to make sure the checkboxes are always 44 pixels wide and perfectly aligned, no matter how long your habit name is. If your habit is called "Practice piano for 30 minutes," the checkbox size doesn't change only the name text gets shorter with "...". This keeps the table neat and easy to scan, whether you have 3 habits or 20.

**Why Monday is the first day of the week** 
Most of us think about habits around our work/school week. SO Monday to Sunday makes sense.

---

## 3. Mobile-Friendly & Accessible Design

**How it works on different screen sizes:**

On your **phone (360px wide)**, the checkboxes shrink a little bit (26px instead of 44px), the labels get smaller, and everything gets tighter. But the full 7-day week is still visible. I didn't hide any days, because the whole point is to see your whole week at a glance. If your habit name is long, it gets cut off with "...", which is a fair tradeoff on a small screen.

On your **desktop (1440px wide)**, everything has plenty of breathing room. The habit name column grows to fill the space, checkboxes stay big and easy to click, and there's no wasted empty space. The table looks perfectly balanced.

**Making it keyboard-friendly:**

Keyboard users can tab through the app and see a clear lime-green focus outline, while icon-only buttons still have hidden text labels for screen readers. The grid structure uses proper ARIA roles so assistive tech can understand habits, days, and rows.

**One thing I didn't get to:**

Ideally, if you have a very long list of habits, there should be a "skip to habits" link at the top of the page so keyboard users don't have to tab through the header every time. I skipped this because the app is small and this was a lower priority than the other accessibility features.

---

## 4. Where I Got Help from AI

I used Claude AI in a few places to speed things up:

**a) Getting the project started**
Claude helped me set up the React + Vite folder structure. I took what it gave me and then reorganized it myself because I wanted the code to be clear and easy to navigate.Then i add some features like top streak and visually weekly report

**b) The streak calculation**
I asked Claude to write the code that counts "how many days in a row have you done this habit?" It gave me something that worked, but I tweaked it. The original would say your streak was 0 if you hadn't checked today yet, even if it's still morning. I changed it so your streak only resets at midnight - because it's not fair to lose your streak just because you haven't opened the app yet today.

**c) The grid layout**
I was trying to figure out how to keep the checkboxes always the same size while letting the habit names stretch or shrink. Claude suggested one approach, but I improved it. I used `minmax()` to make the layout smarter - habit names can be small or large depending on your screen size, and the checkboxes always stay perfect.

---

## 5. What Could Be Better

**The weak spot:** On your phone with lots of habits (10+), it's hard to see the full habit name if it's long. The text gets cut off with "...", but you can't see the full name unless you tap to rename it. Also The mobile layout still has spacing issues on narrow screens. With another day I would refine the grid column widths and padding specifically for small devices, and test across multiple screen sizes more thoroughly.

**What I'd do next:** With another day, I would add user authentication and replace localStorage with a cloud database (Supabase). Right now data only persists in the browser and clearing cache loses everything.