import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../utils/api_orders";
import { removeAll } from "../utils/api_cart";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function CheckOutPage() {
  const location = useLocation();

  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { data: checkoutItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const queryClient = useQueryClient();

  const calculateTotal = () => {
    let total = 0;
    checkoutItems.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const createNewOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (resData) => {
      removeAll();
      const billplz_url = resData.billplz_url;
      window.location.href = billplz_url;
    },
    onError: (e) => {
      enqueueSnackbar(e, { variant: "error" });
    },
  });

  const handleCheckOut = (e) => {
    if (name === "" || email === "") {
      alert("You must fill the infomation before you make payment");
    } else if (!checkoutItems && checkoutItems.length < 1) {
      alert("Your cart is empty");
    } else {
      createNewOrderMutation.mutate({
        customerName: name,
        customerEmail: email,
        products: [...checkoutItems],
        total: calculateTotal(),
      });
    }
  };

  return (
    <Container>
      <Header location={location.pathname} />
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography>Email</Typography>
              <TextField
                required
                placeholder="Email"
                variant="outlined"
                color="info"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box sx={{ py: 3, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  onClick={handleCheckOut}
                >
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
