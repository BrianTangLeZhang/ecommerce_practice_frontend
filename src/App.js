import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import ProductAddNew from "./pages/ProductAddNew";
import CartPage from "./pages/Cart";
import ProductsEdit from "./pages/ProdustEdit";
import CheckOutPage from "./pages/CheckOut";
import AllOrders from "./pages/Orders";
import PaymentVerify from "./pages/PaymentVerify";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider def>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/add" element={<ProductAddNew />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/edit/:id" element={<ProductsEdit />}></Route>
              <Route path="/checkout" element={<CheckOutPage />}></Route>
              <Route path="/orders" element={<AllOrders />}></Route>
              <Route path="/verify-payment" element={<PaymentVerify />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>

            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
