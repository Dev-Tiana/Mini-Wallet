"use client";
import { createContext, useState, useEffect } from "react";
import { saveToStorage, loadFromStorage } from "../utils/storage";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);   
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  // Use to Load saved balance & transactions
  useEffect(() => {
    const savedBalance = loadFromStorage("balance", null);
    const savedTx = loadFromStorage("transactions", null);

    setBalance(savedBalance !== null ? savedBalance : 1000);
    setTransactions(savedTx !== null ? savedTx : []);
  }, []);

  // Use Save to localStorage whenever updated
  useEffect(() => {
    saveToStorage("balance", balance);
    saveToStorage("transactions", transactions);
  }, [balance, transactions]);

  const addTransaction = (type, amount) => {
  let newBalance = balance;

  if (type === "credit") {
    newBalance += amount;
  } else if (type === "debit") {
    if (amount > balance) {
      setError("Insufficient funds");
      return;
    }
    if (balance - amount < 0) {
      setError("Balance can't be below $0");
      return;
    }
    newBalance -= amount;
  }

  const now = new Date();

  const newTx = {
    id: transactions.length + 1,
    type,
    amount,
    balanceRemaining: newBalance,
    date: now.toLocaleDateString(),   
    time: now.toLocaleTimeString(),   
  };

  setBalance(newBalance);
  setTransactions([newTx, ...transactions]);
};

  return (
    <WalletContext.Provider value={{ balance, transactions, addTransaction, error, setError }}>
      {children}
    </WalletContext.Provider>
  );
};
