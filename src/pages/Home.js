import Header from "../components/header";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Container,
  Grid,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getProducts, getCategories } from "../utils/api_products";
import { useQuery } from "@tanstack/react-query";
import AdminButtons from "../components/buttons";
import UserButtons from "../components/userBtn";
import ProductCard from "../components/productCard";

export default function Home() {
  const [category, setCategory] = useState("");

  const { data: products } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <Container>
      <Header />
      <Box sx={{ flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <FormControl sx={{ width: "400px", margin: "20px 0" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={category}
            color="primary"
            sx={{ backgroundColor: "white" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {products ? (
            <Grid container spacing={3}>
              {products.map((p) => (
                <Grid item xs={12} md={6} lg={4} key={p._id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Container>
  );
}
