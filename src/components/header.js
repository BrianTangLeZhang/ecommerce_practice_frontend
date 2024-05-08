import { Typography, Divider, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { location } = props;
  const nav = useNavigate();
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {location && location !== "/"
          ? location[1].toUpperCase() + location.slice(2, location.length)
          : "Welcome to My Store"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {location !== "/" && (
          <Button
            onClick={() => {
              nav("/");
            }}
          >
            Home
          </Button>
        )}
        {location !== "/cart" && (
          <Button
            variant="contained"
            onClick={() => {
              nav(`/cart`);
            }}
          >
            Cart
          </Button>
        )}
        {location === "/orders" && (
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              nav(`${location}`);
            }}
          >
            {location[1].toUpperCase() + location.slice(2, location.length)}
          </Button>
        )}
      </Box>
      <Divider sx={{ marginY: 4 }} />
    </>
  );
}
