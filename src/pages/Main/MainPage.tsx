import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getItem, getSearchItems } from "../../store/modules/items";
import { DebounceInput } from "react-debounce-input";

import styles from "./MainPage.module.scss";
import s from "../Products/ProductsPage.module.scss";
import truncateText from "../../utils/truncateText";
import replaceImage from "../../utils/replaceImage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const foundItems = useAppSelector((state) => state.items.foundItems);
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    setSearchText(event.target.value);
    dispatch(getSearchItems(event.target.value));
  };

  const clearInput = () => {
    setSearchText("");
    dispatch(getSearchItems(""));
  };

  const renderItems = () => {
    const filteredItems = foundItems.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const getTargetItem = (id: string) => {
      toast.promise(dispatch(getItem(id)), {
        pending: "Загрузка страницы товара...",
        success: "Страница товара загружена успешно!",
        error: "Ошибка при загрузке страницы товара!",
      });
      navigate(`/products/${id}`);
    };

    return (
      <div className={s.products}>
        {filteredItems.map((elem) => (
          <div
            key={elem.id}
            className={s.card}
            onClick={() => {
              getTargetItem(elem.id);
            }}
          >
            <img
              src={elem.picture}
              alt={truncateText(elem.title, 2)}
              width={250}
              height={250}
              onError={(e) => replaceImage(e)}
            />

            <div className={s.card__title}>{elem.title}</div>
            <div className={s.card__rating}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={s.card__rating_star}>
                  <img
                    src={
                      i < Math.floor(elem.rating)
                        ? `${"/svg/FullStar.svg"}`
                        : i < elem.rating
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
            <div className={s.card__price}>{elem.price} &#8381;</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.search}>
          <h1>
            {searchText ? `Поиск по запросу: "${searchText}"` : "Все товары"}
          </h1>
          <div className={styles.search__block}>
            <img src="/svg/search.svg" alt="Search" />
            {searchText && (
              <img
                className={styles.search__block_clear}
                src="/svg/close.svg"
                alt="Clear"
                onClick={clearInput}
              />
            )}
            <DebounceInput
              minLength={2} // минимальная длина ввода перед тем, как будет вызвана функция handleSearchInputChange
              debounceTimeout={500} // задержка перед тем, как будет вызвана функция handleSearchInputChange
              onChange={handleSearchInputChange}
              value={searchText}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className={styles.search__items}>{renderItems()}</div>
        <img
          className={styles.background}
          src="/Background.png"
          alt="background"
          width={1000}
        />
      </div>
    </Layout>
  );
};
