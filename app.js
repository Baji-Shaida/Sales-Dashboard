// ---- helpers ----
const fmtUSD = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtUSD2 = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CSS = getComputedStyle(document.documentElement);
const cssVar = (name) => CSS.getPropertyValue(name).trim();

document.getElementById("today").textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});
document.getElementById("lastUpdated").textContent =
  "LAST UPDATED " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).toUpperCase();

// ---- KPIs ----
function renderKPIs(range) {
  const rev = SALES_DATA.monthlyRevenue.slice(-range);
  const ord = SALES_DATA.monthlyOrders.slice(-range);
  const totalRevenue = rev.reduce((a, b) => a + b, 0);
  const totalOrders = ord.reduce((a, b) => a + b, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const prevRev = SALES_DATA.monthlyRevenue.slice(-range * 2, -range).reduce((a, b) => a + b, 0) || totalRevenue;
  const growth = ((totalRevenue - prevRev) / prevRev) * 100;

  const kpis = [
    { label: "Total Revenue", stamp: "PAID", value: fmtUSD(totalRevenue), delta: `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}% vs prior period`, up: growth >= 0 },
    { label: "Orders", stamp: "COUNT", value: totalOrders.toLocaleString(), delta: `${(totalOrders / range).toFixed(0)} avg / mo`, up: true },
    { label: "Avg. Order Value", stamp: "AOV", value: fmtUSD2(avgOrderValue), delta: "across all channels", up: true },
    { label: "Top Region", stamp: "SHARE", value: SALES_DATA.regions[0].name, delta: `${SALES_DATA.regions[0].pct}% of revenue`, up: true }
  ];

  document.getElementById("kpiRow").innerHTML = kpis.map(k => `
    <div class="kpi">
      <div class="label"><span>${k.label}</span><span class="stamp">${k.stamp}</span></div>
      <div class="value">${k.value}</div>
      <div class="delta ${k.up ? "up" : "down"}">${k.up ? "▲" : "▼"} ${k.delta}</div>
    </div>
  `).join("");
}

// ---- Revenue line chart ----
let revenueChart, categoryChart;
function renderRevenueChart(range) {
  const months = SALES_DATA.months.slice(-range);
  const data = SALES_DATA.monthlyRevenue.slice(-range);
  const ctx = document.getElementById("revenueChart");

  if (revenueChart) revenueChart.destroy();
  const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 220);
  gradient.addColorStop(0, "rgba(201,162,75,0.35)");
  gradient.addColorStop(1, "rgba(201,162,75,0.02)");

  revenueChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        data,
        borderColor: cssVar("--gold"),
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: cssVar("--gold"),
        pointBorderColor: cssVar("--ink-2"),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: cssVar("--surface-2"),
          borderColor: cssVar("--rule"),
          borderWidth: 1,
          titleFont: { family: "IBM Plex Mono", size: 11 },
          bodyFont: { family: "IBM Plex Mono", size: 12 },
          callbacks: { label: (c) => fmtUSD(c.parsed.y) }
        }
      },
      scales: {
        x: { grid: { color: "rgba(51,81,63,0.4)" }, ticks: { color: cssVar("--parchment-dim"), font: { family: "IBM Plex Mono", size: 10.5 } } },
        y: { grid: { color: "rgba(51,81,63,0.4)" }, ticks: { color: cssVar("--parchment-dim"), font: { family: "IBM Plex Mono", size: 10.5 }, callback: (v) => "$" + (v / 1000) + "k" } }
      }
    }
  });
}

// ---- Category donut chart ----
function renderCategoryChart() {
  const ctx = document.getElementById("categoryChart");
  const labels = SALES_DATA.categories.map(c => c.name);
  const values = SALES_DATA.categories.map(c => c.value);
  const palette = ["#C9A24B", "#7FB88A", "#4F8FB8", "#B5573F", "#8A6FB8"];

  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: palette, borderColor: cssVar("--surface"), borderWidth: 3 }]
    },
    options: {
      responsive: true,
      cutout: "62%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: cssVar("--parchment-dim"), font: { family: "Inter", size: 11.5 }, padding: 14, boxWidth: 10 }
        },
        tooltip: {
          backgroundColor: cssVar("--surface-2"),
          borderColor: cssVar("--rule"),
          borderWidth: 1,
          bodyFont: { family: "IBM Plex Mono", size: 12 },
          callbacks: { label: (c) => `${c.label}: ${fmtUSD(c.parsed)}` }
        }
      }
    }
  });
}

// ---- Orders table ----
function renderOrders() {
  document.getElementById("ordersBody").innerHTML = SALES_DATA.recentOrders.map(o => `
    <tr>
      <td style="font-family:var(--font-mono); font-size:12px;">${o.id}</td>
      <td>${o.customer}</td>
      <td><span class="status ${o.status}">${o.status}</span></td>
      <td class="amount">${fmtUSD2(o.amount)}</td>
    </tr>
  `).join("");
}

// ---- Top products ----
function renderProducts() {
  document.getElementById("productsList").innerHTML = SALES_DATA.topProducts.map((p, i) => `
    <div class="product-row">
      <span class="rank">${String(i + 1).padStart(2, "0")}</span>
      <div class="info">
        <div class="pname">${p.name}</div>
        <div class="pcat">${p.category} · ${p.units.toLocaleString()} units</div>
      </div>
      <div class="pamount">${fmtUSD(p.revenue)}</div>
    </div>
  `).join("");
}

// ---- Regions ----
function renderRegions() {
  document.getElementById("regionsList").innerHTML = SALES_DATA.regions.map(r => `
    <div class="region-row">
      <span class="name">${r.name}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${r.pct}%"></div></div>
      <span class="pct">${r.pct}%</span>
    </div>
  `).join("");
}

// ---- Period toggle ----
document.querySelectorAll(".period-toggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".period-toggle button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const range = parseInt(btn.dataset.range, 10);
    renderKPIs(range);
    renderRevenueChart(range);
  });
});

// ---- init ----
renderKPIs(12);
renderRevenueChart(12);
renderCategoryChart();
renderOrders();
renderProducts();
renderRegions();
