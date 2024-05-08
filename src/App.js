import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import ProductAddNew from "./pages/ProductAddNew";
import CartPage from "./pages/Cart";
import ProductsEdit from "./pages/ProdustEdit";
import CheckOutPage from "./pages/CheckOut";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<ProductAddNew />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/edit/:id" element={<ProductsEdit />}></Route>
          <Route path="/checkout" element={<CheckOutPage />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
