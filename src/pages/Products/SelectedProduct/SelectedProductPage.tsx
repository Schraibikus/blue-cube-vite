import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import { Layout } from "../../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./SelectedProductPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import replaceImage from "../../../utils/replaceImage";
import {
  addToCartItems,
  updateQuantity,
} from "../../../store/modules/cart/cartSlice";
import { getItem } from "../../../store/modules/items";
import { Spinner } from "../../../components/Spinner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import truncateText from "../../../utils/truncateText";
import { toast } from "react-toastify";
import {
  addItemCart,
  clearCart,
  submitCart,
} from "../../../store/modules/cart";
import { toggleSetModal } from "../../../store/modules/modal/modalSlice";

export const SelectedProductPage = (): JSX.Element => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const item = useAppSelector((state) => state.items.item);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const error = useAppSelector((state) => state.items.error);
  const limitTotalPrice = useAppSelector(
    (state) => state.items.limitTotalPrice
  );
  const cart = useAppSelector((state) => state.cart.cartItems);
  const itemInCart = useAppSelector((state) => state.cart.itemsToCart);

  const addToCart = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(addToCartItems({ id, quantity }));
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    if (quantity > 1) {
      toast.info("Количество товара изменено");
    }
  };

  useEffect(() => {
    handleQuantityChange(productId ?? "", quantity);
  }, [productId, quantity]);

  useEffect(() => {
    if (productId) {
      dispatch(getItem(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    dispatch(addItemCart(itemInCart));
  }, [dispatch, itemInCart]);

  const handleAddToCart = () => {
    setIsOpen(true);
    addToCart(productId ?? "", quantity);
  };

  const handleOrder = async () => {
    const totalPrice = cart
      ?.flat()
      .reduce((sum, obj) => obj.product.price * obj.quantity + sum, 0);

    if (totalPrice > limitTotalPrice) {
      toast.error(
        `Общая сумма заказа превышает ${limitTotalPrice} руб, пожалуйста умерьте свои аппетиты`
      );
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    await dispatch(submitCart());
    await dispatch(clearCart());
    toast.success("Заказ успешно оформлен");
    dispatch(toggleSetModal({ isOpen: false }));
    navigate("/products");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.load__container} ref={parent}>
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.product}>
        <Link to="/products" className={styles.product__back}>
          <img
            src="/svg/arrow-left.svg"
            width={20}
            height={20}
            alt="arrow left"
          />
          Назад
        </Link>

        {item ? (
          <>
            <div className={styles.product__top}>
              <img
                src={item.picture}
                width={374}
                height={374}
                alt={item.title}
                onError={replaceImage}
                className={styles.product__top_image}
              />
              <div className={styles.product__top_right}>
                <div>
                  <h1
                    className={styles.product__title}
                    title={`Товар: ${item.title}`}
                  >
                    {truncateText(item.title, 4)}
                  </h1>
                  <div className={styles.product__rating}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={styles.product__rating_star}>
                        <img
                          src={
                            i < Math.floor(item.rating)
                              ? `${"/svg/FullStar.svg"}`
                              : i < item.rating
                              ? `${"/svg/HalfStar.svg"}`
                              : `${"/svg/EmptyStar.svg"}`
                          }
                          alt="star"
                          width={12}
                          height={12}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.product__price}>
                    {item.price} &#8381;
                  </div>
                  {!isOpen && (
                    <button
                      type="button"
                      className={styles.product__button}
                      onClick={() => handleAddToCart()}
                      disabled={item.price > limitTotalPrice}
                      {...(item.price > limitTotalPrice && {
                        title: `Извините, товар превышает стоимость ${limitTotalPrice} руб.`,
                      })}
                    >
                      {item.price > limitTotalPrice
                        ? `Извините, товар превышает стоимость ${limitTotalPrice} руб.`
                        : "Добавить в корзину"}
                    </button>
                  )}
                  {isOpen && (
                    <div className={styles.product__ordersBlock}>
                      <div className={styles.product__ordersBlock_wrapper}>
                        <button
                          type="button"
                          className={styles.product__ordersBlock_btn}
                          onClick={() => setQuantity(quantity - 1)}
                          disabled={quantity === 0}
                        >
                          <svg
                            width="14"
                            height="4"
                            viewBox="0 0 14 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8331 3.45834L1.16645 3.45834C-0.0221827 3.45834 -0.096039 0.541672 1.16645 0.541672L12.8331 0.541673C14.0217 0.541673 14.0956 3.45834 12.8331 3.45834Z"
                              fill="#0073E6"
                            />
                          </svg>
                        </button>
                        <span className={styles.product__ordersBlock_count}>
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className={styles.product__ordersBlock_btn}
                          onClick={() => setQuantity(quantity + 1)}
                          disabled={quantity === 10}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="#0073E6"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.81036 0.397435C7.39834 0.242359 6.60122 0.242359 6.1892 0.397435C5.56371 0.632852 5.54145 1.22259 5.54145 1.79167V5.54167L1.16645 5.54167C-0.0960391 5.54167 -0.0221826 8.45834 1.16645 8.45834L5.54145 8.45834V12.2083C5.54145 12.7774 5.56371 13.3672 6.1892 13.6026C6.60122 13.7577 7.39834 13.7577 7.81036 13.6026C8.43585 13.3672 8.45811 12.7774 8.45811 12.2083V8.45834L12.8331 8.45834C14.0956 8.45834 14.0217 5.54168 12.8331 5.54167L8.45811 5.54167V1.79167C8.45811 1.22259 8.43585 0.632853 7.81036 0.397435Z"
                              fill="#0073E6"
                            />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.product__button_order}
                        onClick={handleOrder}
                        disabled={quantity === 0 || quantity > 10}
                      >
                        Оформить заказ
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.product__undo}>
                  <div className={styles.product__undo_logo}>
                    <img
                      src="/svg/undo.svg"
                      width={20}
                      height={20}
                      alt="arrow undo"
                    />
                    <p>Условия возврата</p>
                  </div>
                  <p>
                    Обменять или вернуть товар надлежащего качества можно в
                    течение 14 дней с момента покупки.
                  </p>
                </div>
                <p className={styles.product__subtext}>
                  Цены в интернет-магазине могут отличаться от розничных
                  магазинов.
                </p>
              </div>
            </div>
            <div className={styles.product__description}>
              <h3>Описание</h3>
              <div
                className={
                  showMore
                    ? styles.product__description_text_active
                    : styles.product__description_text
                }
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description),
                }}
              ></div>
              <button
                className={
                  showMore
                    ? styles.product__description_btn_active
                    : styles.product__description_btn
                }
                type="button"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Скрыть" : "Подробнее"}
              </button>
            </div>
          </>
        ) : (
          <div>{error} Товар не найден</div>
        )}
      </div>
    </Layout>
  );
};
