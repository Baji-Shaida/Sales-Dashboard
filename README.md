# Ledger — Sales Dashboard

A single-page sales dashboard styled like a merchant's ledger book: parchment tones, deep ledger-green surfaces, gold foil accents, and monospaced figures for a "tally tape" feel. No build step — just static HTML/CSS/JS + Chart.js.

**🔗 Live demo: [baji-shaida.github.io/Sales-Dashboard](https://baji-shaida.github.io/Sales-Dashboard/)**

## Screenshots

![Sales Overview — KPI ribbon, revenue trend, and category breakdown](screenshots/dashboard-overview.png)

![Recent orders, top products, and regional split](screenshots/dashboard-orders-products.png)

## What it shows

- KPI ribbon: total revenue, order count, average order value, top region (with a 12/6/3-month toggle)
- Revenue trend line chart
- Revenue by category (donut)
- Recent orders table with status tags (paid / pending / refunded)
- Top products by units sold
- Regional revenue split

## Run it locally

No install needed — it's plain HTML/CSS/JS.

```bash
git clone https://github.com/Baji-Shaida/sales-dashboard.git
cd sales-dashboard
# then just open index.html in your browser, or serve it:
python3 -m http.server 8000
# visit http://localhost:8000
```

## Use your own data

All the numbers live in `data.js`. Replace the values in `SALES_DATA` with your own — the shape (months, monthlyRevenue, categories, regions, topProducts, recentOrders) is all `app.js` expects. No other file needs to change.

## Stack

- HTML/CSS (no framework)
- Vanilla JS
- [Chart.js](https://www.chartjs.org/) for the revenue and category charts
- Google Fonts: Fraunces (display), IBM Plex Mono (data/figures), Inter (body)

## Project structure

```
sales-dashboard/
├── index.html   # markup + styles
├── app.js       # rendering logic (KPIs, charts, tables)
├── data.js      # sample data — swap this for your own
└── README.md
```
