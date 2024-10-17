import { useAppSelector } from "../../../hooks/redux";
import styles from "./RenderSearchItems.module.scss";
import { SingleProduct } from "../../../pages/Products/SingleProduct";

export const RenderSearchItems = (): JSX.Element => {
  const foundItems = useAppSelector((state) => state.items.foundItems);
  const searchValue = useAppSelector((state) => state.items.searchValue);

  const filteredItems = foundItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.products}>
      {filteredItems.map((item) => (
        <SingleProduct key={item.id} {...item} />
      ))}
    </div>
  );
};
