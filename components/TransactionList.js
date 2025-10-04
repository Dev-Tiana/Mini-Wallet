"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function TransactionList({ transactions, selectedCurrency, rates }) {
  if (!transactions.length) {
    return <Typography>No transactions yet</Typography>;
  }

  const convertAmount = (amount) => {
    if (!rates) return amount;
    switch (selectedCurrency) {
      case "EUR":
        return amount * rates.EUR;
      case "GBP":
        return amount * rates.GBP;
      case "NGN":
        return amount * rates.NGN;
      default:
        return amount; // USD
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, maxWidth: 800, margin: "0 auto", overflowX: "auto" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance Remaining</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell
                style={{ color: tx.type === "credit" ? "green" : "red" }}
              >
                {tx.type === "credit" ? "Deposit" : "Withdraw"}
              </TableCell>

              {/* ✅ Amount with + or - sign and colored */}
              <TableCell
                style={{ color: tx.type === "credit" ? "green" : "red" }}
              >
                {tx.type === "credit"
                  ? `+${convertAmount(tx.amount).toFixed(2)}`
                  : `-${convertAmount(tx.amount).toFixed(2)}`}{" "}
                {selectedCurrency}
              </TableCell>

              <TableCell>
                {convertAmount(tx.balanceRemaining).toFixed(2)}{" "}
                {selectedCurrency}
              </TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
