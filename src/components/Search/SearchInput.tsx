import { DebounceInput } from "react-debounce-input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getSearchItems } from "../../store/modules/items";
import { setSearchValue } from "../../store/modules/items/itemsSlice";
import styles from "./Search.module.scss";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.items.searchValue);

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    dispatch(setSearchValue(event.target.value));
    dispatch(getSearchItems(event.target.value));
  };

  const clearInput = () => {
    dispatch(setSearchValue(""));
    dispatch(getSearchItems(""));
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <h4>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все товары"}
        </h4>
        <div className={styles.search__block}>
          <img src="/svg/search.svg" alt="Search" />
          {searchValue && (
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
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      {/* <div className={styles.search__items}>{renderItems()}</div> */}
    </div>
  );
};
