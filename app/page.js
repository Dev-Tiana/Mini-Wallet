"use client";
import { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { useExchangeRates } from "../hooks/useExchangeRates";
import DepositWithdrawDialog from "../components/DepositWithdrawDialog";
import {
  Button,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Home() {
  const { balance, transactions, error, setError } = useContext(WalletContext);
  const { data, isLoading, error: fetchError } = useExchangeRates();

  const [openDialog, setOpenDialog] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getConvertedBalance = () => {
    if (!data?.rates) return balance;
    switch (selectedCurrency) {
      case "EUR": return balance * data.rates.EUR;
      case "GBP": return balance * data.rates.GBP;
      case "NGN": return balance * data.rates.NGN;
      default: return balance;
    }
  };

  const convertAmount = (amount) => {
    if (!data?.rates) return amount;
    switch (selectedCurrency) {
      case "EUR": return amount * data.rates.EUR;
      case "GBP": return amount * data.rates.GBP;
      case "NGN": return amount * data.rates.NGN;
      default: return amount;
    }
  };

  return (
    <Container
      sx={{
        mt: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "80px",
        px: isMobile ? 1 : 3, // ✅ tighter padding on mobile
      }}
    >
      <Typography variant="h4" gutterBottom>
        💳 Mini Wallet
      </Typography>

      {isLoading && <Typography>Loading exchange rates...</Typography>}
      {fetchError && <Typography color="error">Failed to load rates</Typography>}

      {/* Currency Switcher */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2, mb: 2 }}
      >
        {["USD", "EUR", "GBP", "NGN"].map((cur) => (
          <Button
            key={cur}
            variant={selectedCurrency === cur ? "contained" : "outlined"}
            onClick={() => setSelectedCurrency(cur)}
          >
            {cur}
          </Button>
        ))}
      </Stack>

      {/* Balance */}
      <Typography variant="h5" gutterBottom>
        Balance: {getConvertedBalance().toFixed(2)} {selectedCurrency}
      </Typography>

      {/* Deposit & Withdraw */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenDialog("credit")}
        >
          Deposit
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOpenDialog("debit")}
        >
          Withdraw
        </Button>
      </Stack>

      <DepositWithdrawDialog
        open={Boolean(openDialog)}
        onClose={() => setOpenDialog(null)}
        type={openDialog}
      />

      {/* Snackbar for errors */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>

      {/* Latest Transactions */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Latest Transactions (in {selectedCurrency})
      </Typography>

      {isMobile ? (
        // ✅ Mobile Layout
        <List sx={{ width: "100%", maxWidth: "100%", p: 0 }}>
          {transactions.slice(0, 5).map((tx) => (
            <ListItem
              key={tx.id}
              sx={{
                borderBottom: "1px solid #eee",
                px: 1,
                py: 1.2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {/* Left: Arrow icon + Type + Date/Time */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor:
                      tx.type === "credit" ? "green.100" : "red.100",
                    color: tx.type === "credit" ? "green.600" : "red.600",
                    width: 32,
                    height: 32,
                    mr: 1.2,
                  }}
                >
                  {tx.type === "credit" ? (
                    <ArrowDownwardIcon fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" />
                  )}
                </Avatar>

                <ListItemText
                  primary={tx.type === "credit" ? "Deposit" : "Withdraw"}
                  secondary={`${tx.date} • ${tx.time}`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                  secondaryTypographyProps={{
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                />
              </Box>

              {/* Right side */}
              <Box textAlign="right" sx={{ minWidth: 110 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: tx.type === "credit" ? "green" : "red",
                  }}
                >
                  {tx.type === "credit"
                    ? `+${convertAmount(tx.amount).toFixed(2)}`
                    : `-${convertAmount(tx.amount).toFixed(2)}`}{" "}
                  {selectedCurrency}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "gray", fontSize: "0.75rem" }}
                >
                  Balance: {convertAmount(tx.balanceRemaining).toFixed(2)}{" "}
                  {selectedCurrency}
                </Typography>

                <Chip
                  label="Successful"
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 0.3 }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        // ✅ Desktop / Tablet Layout
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: 800,
            mx: "auto",
            borderRadius: 3,
            boxShadow: 2,
            overflowX: "auto",
          }}
        >
          <Table size="small" sx={{ tableLayout: "auto", minWidth: 600 }}>
            <TableHead
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(0, 5).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Avatar
                      sx={{
                        bgcolor:
                          tx.type === "credit" ? "green.100" : "red.100",
                        color: tx.type === "credit"
                          ? "green.600"
                          : "red.600",
                        width: 30,
                        height: 30,
                      }}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: tx.type === "credit" ? "green" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {tx.type === "credit" ? "Deposit" : "Withdraw"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: tx.type === "credit" ? "green" : "red",
                      fontWeight: 500,
                    }}
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
      )}
    </Container>
  );
}
