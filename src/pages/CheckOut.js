import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Card,
  Button,
  Divider,
} from "@mui/material";
import Header from "../components/header";
import { getCart } from "../utils/api_cart";
import { useLocation } from "react-router-dom";

export default function CheckOutPage() {
  const location = useLocation();

  const { data: checkoutItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const calculateTotal = () => {
    let total = 0;
    checkoutItems.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total;
  };

  return (
    <Container>
      <Header location={location} />
      <Box container display={"flex"} justifyContent={"space-between"}>
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: {
              xs: "column-reverse",
              lg: "row",
            },
          }}
        >
          <Grid item sm={12} lg={8}>
            <Typography
              variant="h5"
              textAlign={"center"}
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              Contact Information
            </Typography>
            <Box gap={4}>
              <Typography>Name</Typography>
              <TextField
                required
                placeholder="Name"
                variant="outlined"
                color="info"
                fullWidth
              />
              <Typography>Email</Typography>
              <TextField
                required
                placeholder="Email"
                variant="outlined"
                color="info"
                fullWidth
              />
              <Box sx={{ py: 3, textAlign: "center" }}>
                <Button variant="contained" color="info" size="large">
                  Pay (${calculateTotal()}) Now
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} lg={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1" fontSize={25}>
                Your order summary:
              </Typography>
              <Divider sx={{ marginY: 3 }} />
              {checkoutItems.map((i) => (
                <div
                  key={i._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="p">{i.name}</Typography>
                  <Typography variant="p">
                    ${(i.price * i.quantity).toFixed(2)}
                  </Typography>
                </div>
              ))}
              <Divider sx={{ marginY: 3 }} />
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Total:</Typography>
                <Typography>${calculateTotal()}</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
