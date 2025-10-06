"use client";
import { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Transactions() {
  const { transactions } = useContext(WalletContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{
        paddingTop: "80px",
        maxWidth: "100%",
        px: isMobile ? 0.8 : 4,
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h4"}
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Transaction History
      </Typography>

      {!transactions.length ? (
        <Typography textAlign="center">No transactions available</Typography>
      ) : (
        <>
          {isMobile ? (
            /* For Mobile */
            <List sx={{ width: "100%", maxWidth: "100%", p: 0 }}>
              {transactions.map((tx) => (
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
                  {/* Left: Icon + Type + Date/Time */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemAvatar sx={{ minWidth: "40px" }}>
                      <Avatar
                        sx={{
                          bgcolor:
                            tx.type === "credit" ? "green.100" : "red.100",
                          color: tx.type === "credit" ? "green.600" : "red.600",
                          width: 32,
                          height: 32,
                          mr: 1,
                        }}
                      >
                        {tx.type === "credit" ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        )}
                      </Avatar>
                    </ListItemAvatar>

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

                  {/* Right: Amount + Balance + Status */}
                  <Box textAlign="right" sx={{ minWidth: 120 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: tx.type === "credit" ? "green" : "red",
                      }}
                    >
                      {tx.type === "credit"
                        ? `+${tx.amount}`
                        : `-${tx.amount}`}{" "}
                      USD
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "gray",
                        fontSize: "0.75rem",
                      }}
                    >
                      Balance: {tx.balanceRemaining} USD
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


            /*For Desktop & Tablet */
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                maxWidth: 900,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 2,
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  tableLayout: "auto",
                  minWidth: 700,
                }}
              >
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
                  {transactions.map((tx) => (
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
                          ? `+${tx.amount}`
                          : `-${tx.amount}`}{" "}
                        USD
                      </TableCell>

                      <TableCell>{tx.balanceRemaining} USD</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
}
