import React, { useState, useEffect } from "react";


import {
  TextField,
  MenuItem,
  Typography,
  Pagination,
  Stack,
  CircularProgress
} from "@mui/material";
import { fetchTransactionsBySchool } from "../api";
import TransactionsTable from "./TransactionsTable";

const SCHOOLS = [
  { id: "65b0e6293e9f76a9694d84b4", name: "EDV DEMO SCHOOL" },
  { id: "65b0e6293e9f76a9694d84c1", name: "Kotak CCAvenue" },
  { id: "65b0e6293e9f76a9694d84f9", name: "New Horizon" }
];

export default function SchoolTransactionsPage() {
  const [schoolId, setSchoolId] = useState(SCHOOLS[0].id);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchTransactionsBySchool(schoolId, { page, limit })
      .then((res) => {
        if (!mounted) return;
        setRows(res.data);
        setMeta(res.meta);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [schoolId, page, limit]);

  return (
    <div>
      <Typography variant="h5" className="mb-4 font-semibold">Transactions by School</Typography>

      <div className="mb-4 flex gap-4">
        <TextField
          select
          label="Select School"
          value={schoolId}
          onChange={(e) => { setSchoolId(e.target.value); setPage(1); }}
        >
          {SCHOOLS.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
        </TextField>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><CircularProgress /></div>
      ) : (
        <>
          <TransactionsTable rows={rows} sortBy={"order_time"} sortOrder={"desc"} onRequestSort={() => {}} />
          <Stack spacing={2} className="mt-4 items-center">
            <Pagination
              count={meta.pages || 1}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
            <Typography variant="body2">Total: {meta.total}</Typography>
          </Stack>
        </>
      )}
    </div>
  );
}
