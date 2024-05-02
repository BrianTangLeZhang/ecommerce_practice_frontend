import { Card, Typography, Box, CardContent } from "@mui/material";
import UserButtons from "./userBtn";
import AdminButtons from "./buttons";

export default function ProductCard(props) {
  const { product } = props;
  return (
    <Card sx={{ padding: 1 }}>
      <Typography variant="p" fontSize={20} fontWeight="bold">
        {product.name}
      </Typography>
      <CardContent>
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
            $ {product.price}
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
            {product.category}
          </Typography>
        </Box>
      </CardContent>
      <Box padding={1}>
        <UserButtons />
        <AdminButtons />
      </Box>
    </Card>
  );
}
