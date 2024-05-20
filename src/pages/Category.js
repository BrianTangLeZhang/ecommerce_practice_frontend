import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../components/header";
import { getCategories, addCategory } from "../utils/api_category";
import { useNavigate, Link, useLocation, Form } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function Category() {
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      enqueueSnackbar("Category added successfully", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, { variant: "error" });
    },
  });

  const handleAdd = () => {
    addCategoryMutation.mutate({ name: name });
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" fontWeight={"bold"}>
        Categories
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField
          placeholder="Category Name"
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="70%">
                <Typography fontWeight={"bold"}>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.length > 0 ? (
              <>
                {categories.map((category) => (
                  <TableRow>
                    <TableCell>{category.name}</TableCell>
                    <TableCell colSpan={1} sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <Typography textAlign={"center"} variant="h5">
                No category added
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
