import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "../components/header";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { getCategories } from "../utils/api_category";
import { getProduct, updateProduct } from "../utils/api_products";
import { uploadImage } from "../utils/api_image";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function ProductsEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [cookie] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookie;
  const { token } = currentUser;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image ? product.image : "");
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      enqueueSnackbar("Product updated successfully", { variant: "success" });
      nav("/");
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, { variant: "error" });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (e) => {
      enqueueSnackbar(e.response.data.msg, { variant: "error" });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProductMutation.mutate({
      id: id,
      name: name,
      description: description,
      price: price,
      category: category,
      image: image,
      token: token,
    });
  };

  const handleImageUpload = (e) => {
    uploadImageMutation.mutate(e.target.files[0]);
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

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
            Edit Product
          </Typography>
          <Grid container spacing={2} sx={{ paddingX: 4, paddingY: 4, gap: 4 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
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
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </>
                )}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: 200,
                  border: "2px solid black",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {image !== "" ? (
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt=""
                    style={{ maxHeight: 200 }}
                  />
                ) : (
                  <Typography variant="p">No Image</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                multiple="false"
                onChange={handleImageUpload}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
