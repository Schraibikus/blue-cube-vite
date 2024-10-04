import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404: Страница не найдена</h1>
      <p>Извините, но страница, которую вы ищете, не существует.</p>
      <Link to="/products">Вернуться на список товаров</Link>
    </div>
  );
};
