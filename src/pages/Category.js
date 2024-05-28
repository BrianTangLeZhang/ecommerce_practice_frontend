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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Header from "../components/header";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../utils/api_category";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Category() {
  const [name, setName] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [cateID, setCateID] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
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

  const editCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, { variant: "error" });
    },
  });

  const handleAdd = () => {
    addCategoryMutation.mutate({ name: name, token: token });
  };

  const handleUpdate = () => {
    editCategoryMutation.mutate({ _id: cateID, name: newName, token: token });
  };

  return (
    <Container>
      <Header />
      {token && role === "admin" ? (
        <>
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
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setOpenEditModal(true);
                              setNewName(category.name);
                              setCateID(category._id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteCategory(category._id)}
                          >
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
        </>
      ) : (
        <Typography textAlign={"center"} variant="h5">
          You are not allow to this page
        </Typography>
      )}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ width: "100%" }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
