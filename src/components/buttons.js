import { Button, ButtonGroup } from "@mui/material";
import { deleteProduct } from "../utils/api_products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function AdminButtons(props) {
  const { id } = props;
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (e) => {
      alert(e);
    },
  });

  const handlerDelete = (e) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };

  return (
    <ButtonGroup fullWidth sx={{ margin: "10px 0", gap: 1 }}>
      <Button
        variant="contained"
        color="warning"
        onClick={() => nav(`/edit/${id}`)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={(e) => handlerDelete(e)}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
}
