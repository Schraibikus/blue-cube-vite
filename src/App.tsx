import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ProductsPage } from "./pages/Products";
import { OrdersPage } from "./pages/Orders";
import { CartPage } from "./pages/Cart";
import { SingleProductPage } from "./pages/Products/SingleProduct";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
