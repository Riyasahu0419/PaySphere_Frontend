import React, { useEffect, useState } from "react";

import {
  Pagination,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import queryString from "query-string";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchTransactions } from "../api";
import TableToolbar from "./TableToolbar";
import TransactionsTable from "./TransactionsTable";

// available statuses and schools are derived from mock; we hardcode for UI
const AVAILABLE_STATUSES = ["Pending", "Success", "Failed"];
const AVAILABLE_SCHOOLS = [
  { id: "65b0e6293e9f76a9694d84b4", name: "EDV DEMO SCHOOL" },
  { id: "65b0e6293e9f76a9694d84c1", name: "Kotak CCAvenue" },
  { id: "65b0e6293e9f76a9694d84f9", name: "New Horizon" }
];

export default function TransactionsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // read filters from URL
  const initial = {
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    q: searchParams.get("q") || "",
    statuses: searchParams.getAll("status") || [],
    schools: searchParams.getAll("school") || [],
    from: searchParams.get("from") || null,
    to: searchParams.get("to") || null,
    sortBy: searchParams.get("sortBy") || "order_time",
    sortOrder: searchParams.get("sortOrder") || "desc"
  };

  const [page, setPage] = useState(initial.page);
  const [limit] = useState(initial.limit);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState(initial.q);
  const [statuses, setStatuses] = useState(initial.statuses);
  const [schools, setSchools] = useState(initial.schools);
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);
  const [sortBy, setSortBy] = useState(initial.sortBy);
  const [sortOrder, setSortOrder] = useState(initial.sortOrder);

  const updateUrl = () => {
    const params = {};
    if (q) params.q = q;
    if (statuses && statuses.length) params.status = statuses;
    if (schools && schools.length) params.school = schools;
    if (from) params.from = from;
    if (to) params.to = to;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    params.page = page;
    params.limit = limit;
    navigate({ search: queryString.stringify(params, { arrayFormat: "none" }) }, { replace: true });
  };

  useEffect(() => {
    updateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, statuses, schools, from, to, sortBy, sortOrder]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchTransactions({
          page,
          limit,
          q,
          statuses,
          schoolIds: schools,
          fromDate: from,
          toDate: to,
          sortBy,
          sortOrder
        });
        if (!mounted) return;
        setRows(res.data);
        setMeta(res.meta);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [page, limit, q, statuses, schools, from, to, sortBy, sortOrder]);

  return (
    <div>
      <Typography variant="h5" className="mb-4 font-semibold">Transactions Overview</Typography>

      <TableToolbar
        q={q}
        onQueryChange={(v) => { setQ(v); setPage(1); }}
        statuses={statuses}
        availableStatuses={AVAILABLE_STATUSES}
        onStatusesChange={(v) => { setStatuses(v); setPage(1); }}
        schools={AVAILABLE_SCHOOLS}
        selectedSchools={schools}
        onSchoolsChange={(v) => { setSchools(v); setPage(1); }}
        fromDate={from}
        toDate={to}
        onFromChange={(v) => { setFrom(v); setPage(1); }}
        onToChange={(v) => { setTo(v); setPage(1); }}
        onReset={() => {
          setQ("");
          setStatuses([]);
          setSchools([]);
          setFrom(null);
          setTo(null);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="flex justify-center py-20"><CircularProgress /></div>
      ) : (
        <>
          <TransactionsTable
            rows={rows}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onRequestSort={(field, order) => { setSortBy(field); setSortOrder(order); }}
          />

          <Stack spacing={2} className="mt-4 items-center">
            <Pagination
              count={meta.pages || 1}
              page={page}
              onChange={(e, val) => setPage(val)}
              color="primary"
            />
            <Typography variant="body2">Total: {meta.total} transactions</Typography>
          </Stack>
        </>
      )}
    </div>
  );
}
