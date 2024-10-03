import { useNavigate } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import formatDate from "../../../utils/formatDate";
import styles from "./SingleOrderPage.module.scss";

export const SingleOrderPage = (props) => {
  const { order } = props;
  const navigate = useNavigate();

  const totalPrice = order
    ?.flat()
    .reduce(
      (sum: number, obj: { product: { price: number }; quantity: number }) =>
        obj.product.price * obj.quantity + sum,
      0
    );
  return (
    <section className={styles.container}>
      <div className={styles.order}>
        <div className={styles.order__info}>
          <p className={styles.order__info_title}>Заказ</p>
          <p className={styles.order__info_number}>№ 344312</p>
        </div>
        <div className={styles.order__images}>
          {order?.map((elem) => (
            <img
              key={elem.product.id}
              className={styles.order__images_item}
              onClick={() => navigate(`/products/${elem.product.id}`)}
              src={elem.product.picture}
              alt="empty"
              width={48}
              height={48}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.info__title}>
          <p>Оформлено</p>
          <p>На сумму</p>
        </div>
        <div className={styles.info__desc}>
          <p>{formatDate(order[0]?.createdAt)} г</p>
          <p>{totalPrice} &#8381;</p>
        </div>
      </div>
    </section>
  );
};
