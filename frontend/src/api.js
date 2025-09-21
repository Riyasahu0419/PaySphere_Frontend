// import axios from 'axios'


// const api = axios.create({
// baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000',
// timeout: 15000,
// })


// export const fetchTransactions = (params) => api.get('/transactions', {params}).then(r=>r.data)
// export const fetchSchools = () => api.get('/schools').then(r=>r.data)
// export const checkStatus = (custom_order_id) => api.get('/check-status', {params:{custom_order_id}}).then(r=>r.data)


// export default api

// mock API for frontend-only app
// simulates realistic API with pagination, sorting, filtering


/**
 * The module exports functions:
 * - fetchTransactions({ page, limit, sortBy, sortOrder, q, statuses, schoolIds, fromDate, toDate })
 * - fetchTransactionsBySchool(schoolId, { page, limit })
 * - fetchTransactionStatus(customOrderId)
 *
 * All functions return Promises.
 */

// Dummy dataset (couple dozen entries to show paging/filter/sort)
const DUMMY = (() => {
  const schools = [
    { id: "65b0e6293e9f76a9694d84b4", name: "EDV DEMO SCHOOL" },
    { id: "65b0e6293e9f76a9694d84c1", name: "Kotak CCAvenue" },
    { id: "65b0e6293e9f76a9694d84f9", name: "New Horizon" }
  ];
  const statuses = ["Pending", "Success", "Failed"];
  const gateways = ["PhonePe", "CCAvenue", "Razorpay", "Stripe"];
  const rows = [];
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  for (let i = 1; i <= 68; i++) {
    const school = schools[i % schools.length];
    const status = statuses[i % statuses.length];
    const gateway = gateways[i % gateways.length];
    const orderAmt = [1, 10, 7050, 2000, 500][i % 5];
    const transaction_amount = orderAmt + (i % 3 === 0 ? 50 : 0);
    const created = new Date();
    created.setDate(created.getDate() - (i % 30));
    rows.push({
      collect_id: `COLL-${1000 + i}`,
      custom_order_id: `CUST-${2000 + i}`,
      school_id: school.id,
      school_name: school.name,
      gateway,
      order_amount: orderAmt,
      transaction_amount,
      status,
      order_time: created.toISOString(),
      student_name: `Student ${i}`,
      student_id: `s${100000 + i}`,
      phone: i % 4 === 0 ? "0000000000" : `9${rand(100000000, 999999999)}`,
      edviron_order_id: `68ca${(Math.random() * 1e18).toString(16).slice(0, 12)}`
    });
  }
  return rows;
})();

// small helper to simulate network latency
function delay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchTransactions({
  page = 1,
  limit = 10,
  sortBy = "order_time",
  sortOrder = "desc",
  q = "",
  statuses = [],
  schoolIds = [],
  fromDate = null,
  toDate = null
} = {}) {
  await delay(350);
  // copy
  let data = [...DUMMY];

  // filters
  if (q) {
    const k = q.toLowerCase();
    data = data.filter(
      (r) =>
        r.collect_id.toLowerCase().includes(k) ||
        r.custom_order_id.toLowerCase().includes(k) ||
        r.student_name.toLowerCase().includes(k)
    );
  }
  if (statuses && statuses.length) {
    data = data.filter((r) => statuses.includes(r.status));
  }
  if (schoolIds && schoolIds.length) {
    data = data.filter((r) => schoolIds.includes(r.school_id));
  }
  if (fromDate) {
    const from = new Date(fromDate);
    data = data.filter((r) => new Date(r.order_time) >= from);
  }
  if (toDate) {
    const to = new Date(toDate);
    data = data.filter((r) => new Date(r.order_time) <= to);
  }

  // sort
  data.sort((a, b) => {
    const va = a[sortBy] ?? "";
    const vb = b[sortBy] ?? "";
    if (sortBy === "order_time") {
      return sortOrder === "asc"
        ? new Date(va) - new Date(vb)
        : new Date(vb) - new Date(va);
    }
    if (typeof va === "number") {
      return sortOrder === "asc" ? va - vb : vb - va;
    }
    // fallback string compare
    return sortOrder === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });

  const total = data.length;
  const start = (page - 1) * limit;
  const items = data.slice(start, start + limit);

  return {
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    },
    data: items
  };
}

export async function fetchTransactionsBySchool(schoolId, { page = 1, limit = 10 } = {}) {
  // just delegate to fetchTransactions
  return fetchTransactions({ page, limit, schoolIds: [schoolId] });
}

export async function fetchTransactionStatus(custom_order_id) {
  await delay(200);
  const row = DUMMY.find((r) => r.custom_order_id === custom_order_id);
  if (!row) {
    // simulate not found
    return { found: false, status: "NotFound", message: "Transaction not found." };
  }
  return {
    found: true,
    status: row.status,
    data: {
      collect_id: row.collect_id,
      custom_order_id: row.custom_order_id,
      gateway: row.gateway,
      order_amount: row.order_amount,
      transaction_amount: row.transaction_amount,
      payment_time: row.order_time
    }
  };
}
