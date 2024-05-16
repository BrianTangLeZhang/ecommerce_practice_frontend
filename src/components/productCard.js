import { Card, Typography, Box, CardContent } from "@mui/material";
import UserButtons from "./userBtn";
import AdminButtons from "./buttons";
import { useCookies } from "react-cookie";

export default function ProductCard(props) {
  const { product } = props;
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, email } = currentUser;
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
            RM {product.price}
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
      {!email && (
        <Box padding={1}>
          {role && role === "user" ? (
            <UserButtons product={product} />
          ) : (
            <AdminButtons id={product._id} />
          )}
        </Box>
      )}
    </Card>
  );
}
