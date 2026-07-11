/**
 * Sample sales data for the Ledger dashboard.
 * Replace the contents of SALES_DATA with your own dataset —
 * the shape below is all app.js expects.
 */

const SALES_DATA = {
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  monthlyRevenue: [18200, 21150, 19800, 24300, 27650, 26100, 29400, 31200, 28950, 33100, 35800, 39250],
  monthlyOrders:  [212, 238, 225, 264, 289, 271, 305, 322, 298, 341, 366, 402],

  categories: [
    { name: "Apparel",      value: 41200 },
    { name: "Home Goods",   value: 27600 },
    { name: "Electronics",  value: 63800 },
    { name: "Beauty",       value: 18900 },
    { name: "Outdoor",      value: 22750 }
  ],

  regions: [
    { name: "North",   pct: 34 },
    { name: "South",   pct: 21 },
    { name: "East",    pct: 18 },
    { name: "West",    pct: 20 },
    { name: "Overseas",pct: 7 }
  ],

  topProducts: [
    { name: "Aurora Wireless Headphones", category: "Electronics", units: 1284, revenue: 96300 },
    { name: "Fieldnote Canvas Backpack",  category: "Outdoor",     units: 972,  revenue: 58320 },
    { name: "Solace Linen Shirt",         category: "Apparel",     units: 861,  revenue: 34440 },
    { name: "Cedar & Clay Diffuser",      category: "Home Goods",  units: 754,  revenue: 22620 },
    { name: "Matte Mineral Sunscreen",    category: "Beauty",      units: 690,  revenue: 13800 }
  ],

  recentOrders: [
    { id: "ORD-8841", customer: "N. Whitfield",   status: "paid",     amount: 284.50 },
    { id: "ORD-8840", customer: "R. Alaoui",      status: "paid",     amount: 129.00 },
    { id: "ORD-8839", customer: "J. Okafor",      status: "pending",  amount: 942.10 },
    { id: "ORD-8838", customer: "S. Bianchi",     status: "paid",     amount: 76.25  },
    { id: "ORD-8837", customer: "M. Kowalski",    status: "refunded", amount: 210.00 },
    { id: "ORD-8836", customer: "A. Devaraj",     status: "paid",     amount: 358.90 },
    { id: "ORD-8835", customer: "L. Fontaine",    status: "pending",  amount: 61.40  },
    { id: "ORD-8834", customer: "T. Nakamura",    status: "paid",     amount: 499.99 }
  ]
};
