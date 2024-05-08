import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { deleteOrder, getOrders, updateOrder } from "../utils/api_orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Header from "../components/header";

export default function AllOrders() {
  const location = useLocation();

  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (e) => {
      alert(e);
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (e) => {
      alert(e);
    },
  });

  const handleUpdateOrder = (order, value) => {
    updateOrderMutation.mutate({
      ...order,
      status: value,
    });
  };
  const handleDeleteOrder = (id) => {
    deleteOrderMutation.mutate(id);
  };

  return (
    <Box px={5}>
      <Header location={location.pathname} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={"bold"}>Customer</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Products</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Total Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Payment Date</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography>{order.customerName}</Typography>
                  <Typography>({order.customerEmail})</Typography>
                </TableCell>
                <TableCell>
                  {order.products.map((product) => (
                    <Typography>{product.name}</Typography>
                  ))}
                </TableCell>
                <TableCell>$ {order.total}</TableCell>
                <TableCell>
                  <TextField
                    select
                    fullWidth
                    value={order.status}
                    onChange={(e) => handleUpdateOrder(order, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>{order.paid_at && order.paid_at}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
