import React, { useState } from "react";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import { fetchTransactionStatus } from "../api";

export default function StatusCheckPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetchTransactionStatus(id.trim());
      setResult(res);
    } catch (err) {
      setResult({ found: false, message: "Error checking status" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" className="mb-4 font-semibold">Check Transaction Status</Typography>

      <div className="flex gap-3 mb-4">
        <TextField
          label="Enter custom_order_id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" onClick={check} disabled={!id || loading}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>

      {result && (
        <Paper className="p-4">
          {!result.found ? (
            <Typography color="error">{result.message || "Not found"}</Typography>
          ) : (
            <>
              <Typography variant="subtitle1">Status: <strong>{result.status}</strong></Typography>
              <Divider className="my-2" />
              <pre className="text-sm">{JSON.stringify(result.data, null, 2)}</pre>
            </>
          )}
        </Paper>
      )}
    </div>
  );
}
