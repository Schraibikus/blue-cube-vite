import { useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import styles from "./SingleOrderPage.module.scss";
import {
  addToCartItems,
  CartItem,
} from "../../../store/modules/cart/cartSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { getItem } from "../../../store/modules/items";
import replaceImage from "../../../utils/replaceImage";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const SingleOrderPage = ({
  order,
  idx,
}: {
  order: CartItem | CartItem[];
  idx: number;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [parent] = useAutoAnimate();

  const getTargetItem = (id: string) => {
    dispatch(getItem(id));
    navigate(`/products/${id}`);
  };

  const handleRepeatOrder = () => {
    if (Array.isArray(order)) {
      order.forEach((item) => {
        if (item.quantity > 0) {
          dispatch(
            addToCartItems({ id: item.product.id, quantity: item.quantity })
          );
        }
      });
    }
    navigate("/cart");
  };

  const totalPrice =
    Array.isArray(order) &&
    order
      ?.flat()
      .reduce(
        (sum: number, obj: { product: { price: number }; quantity: number }) =>
          obj.product.price * obj.quantity + sum,
        0
      );

  return (
    <section className={styles.container} ref={parent}>
      <div className={styles.order}>
        <div className={styles.order__info}>
          <p className={styles.order__info_title}>Заказ</p>
          <p className={styles.order__info_number}>{idx + 1}</p>
        </div>
        <div className={styles.order__images}>
          {Array.isArray(order) ? (
            order.map(
              (elem: {
                quantity: number;
                product: {
                  id: string;
                  picture: string;
                  title: string;
                  price: number;
                };
              }) => (
                <img
                  key={elem.product.id}
                  className={styles.order__images_item}
                  onClick={() => getTargetItem(elem.product.id)}
                  src={elem.product.picture}
                  alt="empty"
                  width={48}
                  height={48}
                  onError={replaceImage}
                  title={`Товар: ${elem.product.title}, Стоимость: ${elem.product.price} руб, Количество в заказе: ${elem.quantity}`}
                />
              )
            )
          ) : (
            <img
              key={order.product.id}
              className={styles.order__images_item}
              onClick={() => getTargetItem(order.product.id)}
              src={order.product.picture}
              alt="empty"
              width={48}
              height={48}
            />
          )}
        </div>
      </div>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.info__button}
          onClick={handleRepeatOrder}
        >
          Повторить заказ
        </button>
        <div className={styles.info__title}>
          <p>Оформлено</p>
          <p>На сумму</p>
        </div>
        <div className={styles.info__desc}>
          {Array.isArray(order) ? (
            <p>{formatDate(order[0]?.createdAt)} г</p>
          ) : (
            <p>{formatDate(order?.createdAt)} г</p>
          )}
          <p>{totalPrice} &#8381;</p>
        </div>
      </div>
    </section>
  );
};
