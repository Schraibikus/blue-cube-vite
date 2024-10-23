import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ProductsPage } from "./pages/Products";
import { OrdersPage } from "./pages/Orders";
import { CartPage } from "./pages/Cart";
import { SelectedProductPage } from "./pages/Products/SelectedProduct";
import { ModalWindow } from "./components/Modal";
import { TemporaryDrawer } from "./components/Drawer";
import { InfiniteScroll } from "./pages/Products/InfiniteScroll";
import { useAppSelector } from "./hooks/redux";

function App(): JSX.Element {
  const isInfiniteScroll = useAppSelector(
    (state) => state.pagination.isInfiniteScroll
  );
  return (
    <>
      <ModalWindow />
      <TemporaryDrawer />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
        {isInfiniteScroll ? (
          <Route path="/products" element={<InfiniteScroll />} />
        ) : (
          <Route path="/products" element={<ProductsPage />} />
        )}
        <Route path="/products/:productId" element={<SelectedProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
