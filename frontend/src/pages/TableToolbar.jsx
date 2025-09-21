import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

/**
 * Simple toolbar with:
 * - search input
 * - status multi-select
 * - school multi-select
 * - date range (from, to)
 *
 * This component uses controlled props and emits callbacks.
 */
export default function TableToolbar({
  q,
  onQueryChange,
  statuses,
  availableStatuses,
  onStatusesChange,
  schools,
  selectedSchools,
  onSchoolsChange,
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onReset
}) {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
      <TextField
        label="Search (collect/custom/student)"
        value={q}
        onChange={(e) => onQueryChange(e.target.value)}
        variant="outlined"
        fullWidth
        size="small"
      />

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={statuses}
          label="Status"
          onChange={(e) => onStatusesChange(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {availableStatuses.map((s) => <MenuItem value={s} key={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel>School</InputLabel>
        <Select
          multiple
          value={selectedSchools}
          label="School"
          onChange={(e) => onSchoolsChange(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)}
          renderValue={(selected) => selected.length ? selected.length + " selected" : ""}
        >
          {schools.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="From"
          value={fromDate ? new Date(fromDate) : null}
          onChange={(d) => onFromChange(d ? d.toISOString() : null)}
          renderInput={(params) => <TextField {...params} size="small" fullWidth />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="To"
          value={toDate ? new Date(toDate) : null}
          onChange={(d) => onToChange(d ? d.toISOString() : null)}
          renderInput={(params) => <TextField {...params} size="small" fullWidth />}
        />
      </LocalizationProvider>

      <div className="flex gap-2">
        <Button variant="outlined" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}