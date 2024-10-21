import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ProductsPage } from "./pages/Products";
import { OrdersPage } from "./pages/Orders";
import { CartPage } from "./pages/Cart";
import { SelectedProductPage } from "./pages/Products/SelectedProduct";
import { ModalWindow } from "./components/Modal";
import { TemporaryDrawer } from "./components/Modal/Drawer";

function App(): JSX.Element {
  return (
    <>
      <ModalWindow />
      <TemporaryDrawer />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<SelectedProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
