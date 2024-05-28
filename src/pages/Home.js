import Header from "../components/header";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getProducts } from "../utils/api_products";
import { getCategories } from "../utils/api_category";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Home() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role } = currentUser;

  const nav = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["products", category, page],
    queryFn: () => getProducts(category, page),
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
          {role && role === "admin" ? (
            <Button
              variant="contained"
              sx={{
                marginLeft: "auto",
                marginRight: "10px",
                marginTop: "10px",
                backgroundColor: "#1BA930",
              }}
              onClick={() => {
                nav("/add");
              }}
            >
              Add New
            </Button>
          ) : null}
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
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flex: 1 }}>
          {products || products.length > 0 ? (
            <>
              <Box>
                <Grid container spacing={3}>
                  {products.map((p) => (
                    <Grid item xs={12} md={6} lg={4} key={p._id}>
                      <ProductCard product={p} />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    paddingY: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      page !== 1 && setPage(page - 1);
                    }}
                  >
                    Previous
                  </Button>
                  <Typography>Page {page}</Typography>

                  <Button
                    onClick={() => {
                      products.length === 6 && setPage(page + 1);
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Typography align="center" sx={{ paddingY: 5 }}>
              No product already
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
