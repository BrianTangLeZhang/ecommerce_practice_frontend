import { Button } from "@mui/material";
import { addToCart } from "../utils/api_cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function UserButtons(props) {
  const { product } = props;
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const addCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (e) => {
      alert(e);
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
