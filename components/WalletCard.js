import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function WalletCard({ balance, rates }) {
  if (!rates) return null;

  const currencies = {
    USD: balance,
    EUR: balance * rates.EUR,
    GBP: balance * rates.GBP,
    NGN: balance * rates.NGN,
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(currencies).map(([code, value]) => (
        <Grid item xs={6} md={3} key={code}>
          <Card>
            <CardContent>
              <Typography variant="h6">{code}</Typography>
              <Typography variant="body1">{value.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
