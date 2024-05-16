import { Typography, Divider, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { removeAll } from "../utils/api_cart";

export default function Header() {
  const location = useLocation();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);
  const { currentUser } = cookies;

  let pageTitle = "Welcome to My Store";

  if (location.pathname === "/cart") {
    pageTitle = "Cart";
  } else if (location.pathname === "/checkout") {
    pageTitle = "Checkout";
  } else if (location.pathname === "/orders") {
    pageTitle = "My Orders";
  } else if (location.pathname === "/login") {
    pageTitle = "Login";
  } else if (location.pathname === "/signup") {
    pageTitle = "Create A New Account";
  }

  const handleLogout = () => {
    removeCookie("currentUser");
    removeAll(); //empty the cart
    nav("/");
  };

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          marginBottm: "20px",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        {pageTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/" ? "white" : "#0288d1",
              backgroundColor:
                location.pathname === "/" ? "#0288d1" : "white",
            }}
            onClick={() => {
              nav("/");
            }}
          >
            Home
          </Button>
          <Button
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/cart" ? "white" : "#0288d1",
              backgroundColor:
                location.pathname === "/cart" ? "#0288d1" : "white",
            }}
            onClick={() => {
              nav("/cart");
            }}
          >
            Cart
          </Button>
          <Button
            style={{
              textTransform: "capitalize",
              color: location.pathname === "/orders" ? "white" : "#0288d1",
              backgroundColor:
                location.pathname === "/orders" ? "#0288d1" : "white",
            }}
            onClick={() => {
              nav("/orders");
            }}
          >
            My Orders
          </Button>
        </Box>
        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{currentUser.name}</span>
            <Button
              style={{
                textTransform: "capitalize",
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button
              style={{
                textTransform: "capitalize",
                color: location.pathname === "/login" ? "white" : "#0288d1",
                backgroundColor:
                  location.pathname === "/login" ? "#0288d1" : "white",
              }}
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </Button>
            <Button
              style={{
                textTransform: "capitalize",
                color: location.pathname === "/signup" ? "white" : "#0288d1",
                backgroundColor:
                  location.pathname === "/signup" ? "#0288d1" : "white",
              }}
              onClick={() => {
                nav("/signup");
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
      <Divider />
    </>
  );
}
