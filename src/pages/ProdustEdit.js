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
} from "@mui/material";
import { getProduct, updateProduct } from "../utils/api_products";
import { uploadImage } from "../utils/api_image";

export default function ProductsEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
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
      alert("Success");
      nav("/");
    },
    onError: (e) => {
      alert(e);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (e) => {
      alert(e);
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
              <TextField
                label="Category"
                variant="outlined"
                type="text"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
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
