import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import Header from "../components/header";
import { getCart, removeItem, removeAll } from "../utils/api_cart";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function CartPage() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total;
  };

  const removeItemMutation = useMutation({
    mutationFn: removeItem,
    onSuccess: () => {
      enqueueSnackbar("Deleted", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (e) => {
      enqueueSnackbar(e, { variant: "error" });
    },
  });

  const handleRemoveItem = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this item from cart?"
    );
    if (confirm) {
      removeItemMutation.mutate(id);
    }
  };

  return (
    <Container>
      <Header location={location.pathname} />
      {cartItems.length === 0 ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="h5">Cart is empty</Typography>
          <Typography component={Link} to="/">
            Go Back
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">
                      ${item.price * item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleRemoveItem(item._id)}
                        sx={{ backgroundColor: "red", color: "white" }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Total: ${calculateTotal()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Box mt={3} display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => nav("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
