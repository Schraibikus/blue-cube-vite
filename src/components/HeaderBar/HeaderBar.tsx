import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSetModal } from "../../store/modules/modal/modalSlice";
import styles from "./HeaderBar.module.scss";
import { Link, NavLink } from "react-router-dom";

export const HeaderBar = (): JSX.Element => {
  const cartCount = useAppSelector((state) => state.cart.itemsToCart.length);
  const dispatch = useAppDispatch();
  const handleOpenModal = () => dispatch(toggleSetModal({ isOpen: true }));
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition >= 100) {
        setIsBackButtonVisible(true);
      } else {
        setIsBackButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link
          to="/"
          className={`${styles.header__logo} ${
            isBackButtonVisible ? styles.invisible : ""
          }`}
        >
          <img src="/svg/brand.svg" alt="logo" width={150} height={24} />
        </Link>
        <button
          className={`${styles.header__back_button} ${
            isBackButtonVisible ? styles.visible : ""
          }`}
          type="button"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img
            src="/svg/arrow-left.svg"
            alt="up"
            style={{ transform: "rotate(90deg)" }}
          />
          Наверх
        </button>
        <div className={styles.header__navigation}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? styles.header__navigation_link_active
                : styles.header__navigation_link
            }
          >
            Товары
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? styles.header__navigation_link_active
                : styles.header__navigation_link
            }
          >
            Заказы
          </NavLink>
        </div>
        <button
          className={styles.header__button}
          type="button"
          onClick={handleOpenModal}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8491 5.52435H8.73651C7.49046 5.52435 7.31561 3.23352 7.0559 2.37057C6.9302 1.9529 6.54675 1.66667 6.1126 1.66667H2.65209C1.29638 1.66667 1.21737 4.49394 2.65209 4.49394C3.41368 4.49394 4.67532 4.23951 4.96333 5.1989L7.00203 12.0142C7.32949 13.1051 8.41328 13.774 9.52875 13.5598C12.0578 13.0788 14.6383 12.476 16.9547 11.3231C17.6677 10.969 18.1494 10.2799 18.2455 9.48697C18.3545 8.5765 18.3561 7.66562 18.2466 6.75512C18.1621 6.04803 17.5579 5.52435 16.8491 5.52435Z"
              fill="#172029"
            />
            <path
              d="M6.33147 16.5672C6.33147 17.5425 7.12054 18.3333 8.09236 18.3333C9.06417 18.3333 9.85326 17.5425 9.85326 16.5672C9.85326 15.5909 9.06417 14.8001 8.09236 14.8001C7.12054 14.8001 6.33147 15.5909 6.33147 16.5672Z"
              fill="#172029"
            />
            <path
              d="M15.3107 18.3333C14.3389 18.3333 13.5499 17.5425 13.5499 16.5672C13.5499 15.5909 14.3389 14.8001 15.3107 14.8001C16.2826 14.8001 17.0716 15.5909 17.0716 16.5672C17.0716 17.5425 16.2826 18.3333 15.3107 18.3333Z"
              fill="#172029"
            />
          </svg>
          Корзина
          {cartCount === 0 ? null : (
            <span className={styles.cartCount}>({cartCount})</span>
          )}
        </button>
      </header>
    </div>
  );
};
