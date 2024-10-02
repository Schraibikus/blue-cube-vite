import { Layout } from "../../../components/Layout";
import styles from "./SingleOrderPage.module.scss";

export const SingleOrderPage = () => {
  return (
    <Layout>
      <section className={styles.container}>
        <div className={styles.order}>
          <div className={styles.order__info}>
            <p className={styles.order__info_title}>Заказ</p>
            <p className={styles.order__info_number}>№344312</p>
          </div>
          <div className={styles.order__images}>
            <img src="/not-image.jpg" alt="empty" width={48} height={48} />
            <img src="/not-image.jpg" alt="empty" width={48} height={48} />
            <img src="/not-image.jpg" alt="empty" width={48} height={48} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.info__title}>
            <p>Оформлено</p>
            <p>На сумму</p>
          </div>
          <div className={styles.info__desc}>
            <p>1 января 2023 г</p>
            <p>2 324 ₽</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
