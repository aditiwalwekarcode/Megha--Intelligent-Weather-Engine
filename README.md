# Megha — Intelligent Weather Engine

> *Megha (मेघ) — Sanskrit and Marathi for cloud*

Megha is a season-aware weather UI built for Pune, India. It reads the current month and automatically adapts its gradient background, temperature, weather condition, rain overlay, and alert banner — so it always looks contextually accurate no matter when someone views it. Built with pure HTML, CSS, and vanilla JavaScript.

🌐 **[Live Demo](https://aditiwalwekarcode.github.io/megha-weather)** 

---

## Screenshot

> <img width="1897" height="865" alt="image" src="https://github.com/user-attachments/assets/fade7baf-90b0-450f-b894-019736d5a904" />
<img width="1892" height="866" alt="image" src="https://github.com/user-attachments/assets/9d624a9d-abc5-4537-8bb4-b78b0f409cdd" />




---

## About

Megha started as a static weather UI mockup and evolved into a season-aware dashboard. Instead of hardcoding a single weather state, the app reads `new Date().getMonth()` and switches between four seasonal profiles — monsoon, post-monsoon, winter, and summer — each with its own gradient, temperature, condition, icons, humidity, UV index, and alert message. The focus throughout was visual polish, CSS craft, and clean JavaScript state management — no API or framework needed.

---

## Features

**Season Engine** *(the core idea)*
- Reads current month on load and sets the correct seasonal profile
- Four seasons: Monsoon (Jun–Sep), Post-Monsoon (Oct–Nov), Winter (Dec–Feb), Summer (Mar–May)
- Dynamic background gradient per season
- Dynamic temperature, condition text, and weather icon per season
- Rain overlay only active during monsoon months
- Season-specific alert banner with relevant message
- Real current date shown in hero badge
- Real current time in auto-sync line

**Current Weather**
- Animated temperature counter on load
- Feels like temperature (unit-aware)
- Weather condition text
- Animated weather icon from season profile

**Forecast**
- Hourly timeline strip with varied temperatures across the day
- 5-day forecast with season-specific icons per day
- Weekly high/low bar chart (pure CSS)

**Extra Weather Data**
- AQI card with color-coded status and animated progress bar
- UV Index card with progress bar (varies by season)
- Wind speed and SW direction indicator with compass arrow
- Sunrise / sunset SVG arc with real-time sun position (calculates from current time)
- Humidity progress bar (varies by season)
- Moon phase display with icon and label (calculated from current date)
- Visibility stat (unit-aware: km / mi)

**UI & Design**
- Glassmorphism cards with `backdrop-filter: blur(30px)`
- Four season gradient backgrounds
- Day / night mode toggle with CSS variable switching
- Animated CSS rain particle engine (60 drops, monsoon only)
- Season-aware alert banner with smooth dismiss animation
- Sequential card reveal animations on load (`slideUp` keyframes)
- Styled toast notification for city search interaction
- `DEMO MODE` and `SEASON ENGINE` badges in header
- Sanskrit subtitle `मेघ` in header
- Emoji favicon in `<head>`
- Responsive 12-column grid layout (mobile-first)

---

## Tech Stack

- HTML5
- CSS3 (custom properties, keyframes, glassmorphism)
- Tailwind CSS (utility layout, responsive breakpoints)
- Vanilla JavaScript (DOM manipulation, date logic, SVG animation)

---

## What I Learned

Building Megha across six iterations taught me a lot about progressive UI development. The biggest technical challenge was the season engine — using `Date().getMonth()` to drive the entire visual and data state of the app without any API. I learned how to animate SVG paths using `stroke-dashoffset` for the solar arc, how to build a CSS rain particle system with randomised `animationDuration`, and how to manage multiple UI states (night mode, unit toggle, season) cleanly with vanilla JS. The project also pushed me to think about real-world UX — a weather app should always feel current and relevant, even when the data is static.

---

## Changelog

### v6.0 — Definitive Season Engine *(current)*
- Season engine fully integrated — reads live month, applies full seasonal profile
- Moon phase calculated from current date using lunar cycle approximation
- Solar arc progress calculated from real current time vs season sunrise/sunset
- Sunrise/sunset times vary per season (Summer: 5:30 / Winter: 7:00 etc.)
- Hourly strip now shows varied temperatures across the day
- 5-day forecast uses season-specific icon arrays (different icon per day)
- UV Index and humidity values now driven by season data
- Night mode properly applies CSS `--glass` and `--accent` variable overrides
- Unit toggle guard added (no re-render if same unit selected)
- Rain particles only generated during monsoon season
- `animateTemp` countdown added for main temperature on load

---

### v5.0 — Smart Engine
- Introduced season-aware condition engine concept
- Dynamic background, condition, icon, and alert per season
- Real date and time shown in UI
- Season-aware alert banner content
- Rain overlay conditional on season

---

### v4.0 — Consolidation
- Animated temperature counter on page load
- Visibility stat made unit-aware (km / mi)
- Progress bars for AQI and humidity with CSS transition animation
- Bar chart with high/low temperature range per day
- Toast notification for city search
- `मेघ` Sanskrit subtitle added to header

---

### v3.0 — Megha Visual Overhaul
- Project renamed to Megha
- Hourly forecast timeline strip restored
- 5-day forecast strip restored
- Sunrise / sunset SVG arc restored and animated
- Wind speed and compass direction card restored
- UV Index card restored
- Alert banner with functional dismiss button
- CSS rain particle engine (replaced broken texture URL)
- `DEMO MODE` badge in header
- Footer with developer name
- Emoji favicon in `<head>`
- Sequential reveal animations on all cards
- `night-mode` CSS variable class properly applied on toggle

---

### v2.0 — Feature Expansion
- Glassmorphism card style with `backdrop-filter: blur`
- Day / night mode toggle
- °C / °F live unit toggle
- AQI card with progress bar
- Moon phase display
- Wind direction indicator
- "Last updated" timestamp
- 12-column grid layout
- CSS `@keyframes` rain overlay

---

### v1.0 — Initial Build
- Hero card with temperature, condition, wind, humidity, visibility
- 5-day forecast strip (mock data)
- Daily summary text block
- Monsoon and summer gradient backgrounds
- Optional OpenWeather API key input
- Demo mode with hardcoded Pune mock data
- Responsive Tailwind layout

---

## Run Locally

```bash
git clone https://github.com/aditiwalwekarcode/megha-weather.git
cd megha-weather
open index.html
```

No build step or dependencies required — opens straight in the browser.

---

*Built by [Aditi Walwekar](https://github.com/aditiwalwekarcode)*
