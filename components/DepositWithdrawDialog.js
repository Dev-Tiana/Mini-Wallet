import { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { WalletContext } from "../context/WalletContext";

export default function DepositWithdrawDialog({ open, onClose, type }) {
  const { addTransaction } = useContext(WalletContext);
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) return;

    addTransaction(type, num);
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type === "credit" ? "Deposit" : "Withdraw"} Money</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Amount (USD)"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {type === "credit" ? "Deposit" : "Withdraw"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
