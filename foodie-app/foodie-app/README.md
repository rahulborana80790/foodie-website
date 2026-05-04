# 🍔 FLAVR — Food Ordering UI

A sleek, dark-themed food ordering website built with pure HTML, CSS, and JavaScript. No backend, no framework, no dependencies (except Google Fonts).

## 📂 File Structure

```
foodie-app/
├── index.html   ← Main HTML structure
├── style.css    ← All styles (dark theme, animations)
├── app.js       ← Data + all interactivity
└── README.md    ← This file
```

## 🚀 How to Run

1. Open the `foodie-app` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Or simply double-click `index.html` to open in your browser

## ✨ Features

- 🌙 Dark, premium UI with orange accent theme
- 🍔 21 dishes across 7 categories (Burgers, Pizza, Sushi, Pasta, Salads, Desserts, Drinks)
- 🔍 Real-time search across dish names and descriptions
- 🗂️ Category filter pills
- 🛒 Slide-in cart sidebar with quantity controls
- 💰 Auto-calculated subtotal + delivery fee
- 🎉 Order success modal with animated delivery tracker
- 📱 Fully responsive (mobile-friendly)

## 🎨 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, keyframe animations
- **Vanilla JS** — all logic, no libraries
- **Google Fonts** — Playfair Display + DM Sans

## 🛠️ Customisation Tips

- **Add dishes**: Edit the `dishes` array in `app.js`
- **Change colours**: Edit CSS variables at the top of `style.css`
- **Add categories**: Add a `cat-pill` button in `index.html` and dishes with matching `cat` in `app.js`
- **Change currency**: Replace `₹` with `$`, `€`, etc. in `app.js` and `style.css`
