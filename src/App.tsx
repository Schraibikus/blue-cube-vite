import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { ProductsPageWithPagination } from "./pages/Products";
import { ProductsPageWithInfiniteScroll } from "./pages/Products";
import { SelectedProductPage } from "./pages/Products/SelectedProduct";
import { OrdersPage } from "./pages/Orders";
import { CartPage } from "./pages/Cart";
import { ModalWindow } from "./components/Modal";
import { Drawer } from "./components/Drawer";
import { useAppSelector } from "./hooks/redux";

function App(): JSX.Element {
  const isInfiniteScroll = useAppSelector(
    (state) => state.pagination.isInfiniteScroll
  );
  return (
    <>
      <ModalWindow />
      <Drawer />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
        {isInfiniteScroll ? ( // Бесконечный скролл или пагинация
          <Route
            path="/products"
            element={<ProductsPageWithInfiniteScroll />}
          />
        ) : (
          <Route path="/products" element={<ProductsPageWithPagination />} />
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
