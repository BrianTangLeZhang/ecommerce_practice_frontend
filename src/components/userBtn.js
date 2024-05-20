import { Button } from "@mui/material";
import { addToCart } from "../utils/api_cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function UserButtons(props) {
  const { product } = props;
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const addCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      enqueueSnackbar("Product is added to cart", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, { variant: "error" });
    },
  });

  return (
    <Button
      variant="contained"
      color="info"
      fullWidth
      onClick={(e) => {
        e.preventDefault();
        addCartMutation.mutate(product);
        nav("/cart");
      }}
    >
      Add to Cart
    </Button>
  );
}
