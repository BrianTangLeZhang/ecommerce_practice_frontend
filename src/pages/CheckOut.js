import { useMutation, useQuery } from "@tanstack/react-query";
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
import { createOrder } from "../utils/api_orders";
import { removeAll } from "../utils/api_cart";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

export default function CheckOutPage() {
  const [cookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookie;
  const { token } = currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { data: checkoutItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

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
      enqueueSnackbar("You must fill the infomation before you make payment", {
        variant: "error",
      });
    } else if (!checkoutItems && checkoutItems.length < 1) {
      enqueueSnackbar("Your cart is empty", { variant: "error" });
    } else {
      createNewOrderMutation.mutate({
        customerName: name,
        customerEmail: email,
        products: [...checkoutItems],
        total: calculateTotal(),
        token:token
      });
    }
  };

  return (
    <Container>
      <Header />
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
