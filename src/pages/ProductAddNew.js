import Header from "../components/header";
import { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { addProduct } from "../utils/api_products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { getCategories } from "../utils/api_category";

export default function ProductAddNew() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const nav = useNavigate();

  const [cookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookie;
  const { token } = currentUser;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  //setup the mutation for add new product
  const addNewMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      enqueueSnackbar("Produst has been added successfully", {
        variant: "success",
      });
      nav("/");
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, {
        variant: "error",
      });
    },
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    addNewMutation.mutate({
      name: name,
      description: description,
      price: price,
      category: category,
      token: token,
    });
  };

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Add New Product
          </Typography>
          <Grid container sx={{ paddingX: 4, paddingY: 4, gap: 4 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                value={price}
                type="number"
                fullWidth
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Category"
                variant="outlined"
                value={category}
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 && (
                  <>
                    {categories.map((category) => (
                      <MenuItem
                        key={category._id}
                        value={category._id}
                      >{category.name}</MenuItem>
                    ))}
                  </>
                )}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={(e) => handlerSubmit(e)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
