import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
  Chip
} from "@mui/material";

function StatusChip({ status }) {
  const color = status === "Success" ? "success" : status === "Failed" ? "error" : "warning";
  return <Chip label={status} color={color} size="small" />;
}

export default function TransactionsTable({
  rows,
  sortBy,
  sortOrder,
  onRequestSort
}) {
  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    onRequestSort(field, isAsc ? "desc" : "asc");
  };

  return (
    <TableContainer component={Paper} className="rounded-2xl shadow">
      <Table stickyHeader>
        <TableHead className="bg-gray-50 dark:bg-slate-800">
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell>Institute Name</TableCell>
            <TableCell sortDirection={sortBy === "order_time" ? sortOrder : false}>
              <TableSortLabel
                active={sortBy === "order_time"}
                direction={sortBy === "order_time" ? sortOrder : "asc"}
                onClick={() => handleSort("order_time")}
              >
                Date & Time
              </TableSortLabel>
            </TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Edviron Order ID</TableCell>
            <TableCell sortDirection={sortBy === "order_amount" ? sortOrder : false}>
              <TableSortLabel
                active={sortBy === "order_amount"}
                direction={sortBy === "order_amount" ? sortOrder : "asc"}
                onClick={() => handleSort("order_amount")}
              >
                Order Amt
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={sortBy === "transaction_amount" ? sortOrder : false}>
              <TableSortLabel
                active={sortBy === "transaction_amount"}
                direction={sortBy === "transaction_amount" ? sortOrder : "asc"}
                onClick={() => handleSort("transaction_amount")}
              >
                Transaction Amt
              </TableSortLabel>
            </TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Phone No.</TableCell>
            <TableCell>Gateway</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow key={r.collect_id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{r.school_name}</TableCell>
              <TableCell>
                <Typography variant="body2">{new Date(r.order_time).toLocaleString()}</Typography>
              </TableCell>
              <TableCell>{r.custom_order_id}</TableCell>
              <TableCell className="max-w-xs truncate" title={r.edviron_order_id}>
                {r.edviron_order_id}
              </TableCell>
              <TableCell>{`₹${r.order_amount}`}</TableCell>
              <TableCell>{`₹${r.transaction_amount}`}</TableCell>
              <TableCell>{r.payment_method ?? "NA"}</TableCell>
              <TableCell><StatusChip status={r.status} /></TableCell>
              <TableCell>{r.student_name}</TableCell>
              <TableCell>{r.student_id}</TableCell>
              <TableCell>{r.phone}</TableCell>
              <TableCell>{r.gateway}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
