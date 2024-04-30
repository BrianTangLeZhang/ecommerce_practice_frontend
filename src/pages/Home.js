import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  Container,
  Grid,
  CardContent,
  CardActions,
  CardHeader,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getProducts, getCategories } from "../utils/api_products";
import { useQuery } from "@tanstack/react-query";
import AdminButtons from "../components/buttons";
import UserButtons from "../components/userBtn";

export default function Home() {
  const [category, setCategory] = useState("");

  const { data: products } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        Welcome to My Store
      </Typography>
      <Divider sx={{ margin: "10px 0" }} />
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
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {products ? (
            <Grid container spacing={6}>
              {products.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p._id}>
                  <Card sx={{ minHeight: "175px", padding: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {p.name}
                    </Typography>
                    <CardContent flex={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="span"
                          sx={{
                            backgroundColor: "lightgreen",
                            borderRadius: 10,
                            padding: 1,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {p.price}
                        </Typography>
                        <Typography
                          variant="span"
                          sx={{
                            backgroundColor: "orange",
                            borderRadius: 10,
                            padding: 1,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {p.category}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 10px",
                      }}
                    >
                      <UserButtons />
                      <AdminButtons />
                    </CardActions>
                  </Card>
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
