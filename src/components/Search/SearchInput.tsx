import { DebounceInput } from "react-debounce-input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getSearchItems } from "../../store/modules/items";
import { setSearchValue } from "../../store/modules/items/itemsSlice";
import styles from "./Search.module.scss";
import getCountWord from "../../utils/getCountWord";
import useDebouncedValue from "../../hooks/useDebounce";
import { useEffect } from "react";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.items.searchValue);
  const foundItems = useAppSelector((state) => state.items.foundItems);

  // const debouncedSearch = useDebouncedValue(searchValue, 500);

  // useEffect(() => {
  //   dispatch(getSearchItems(debouncedSearch));
  // }, [dispatch, debouncedSearch]);

  const filteredItems = foundItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputChange = (event: { target: { value: string } }) => {
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
          {searchValue
            ? `Поиск по запросу: "${searchValue}", найдено: ${
                filteredItems.length
              } ${getCountWord(filteredItems.length)}`
            : "Все товары"}
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
          {/* <input
            type="text"
            value={searchValue}
            placeholder="Поиск..."
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
          /> */}
          <DebounceInput
            minLength={2} // минимальная длина ввода перед тем, как будет вызвана функция handleInputChange
            debounceTimeout={500} // задержка перед тем, как будет вызвана функция handleInputChange
            onChange={handleInputChange}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
  );
};
