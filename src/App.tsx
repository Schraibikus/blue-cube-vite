import { BrowserRouter, Route, Routes } from "react-router-dom";
// import s from "./app.module.scss";
import { Layout } from "./components/Layout";
// import { HeaderBar } from "./components/HeaderBar";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ProductsPage } from "./pages/Products";
import { OrdersPage } from "./pages/Orders";
import { CartPage } from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
