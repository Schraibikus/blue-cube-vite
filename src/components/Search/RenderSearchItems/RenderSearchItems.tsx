import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import truncateText from "../../../utils/truncateText";
import replaceImage from "../../../utils/replaceImage";
import styles from "./RenderSearchItems.module.scss";

export const RenderSearchItems = () => {
  const navigate = useNavigate();
  const foundItems = useAppSelector((state) => state.items.foundItems);
  const searchValue = useAppSelector((state) => state.items.searchValue);

  const filteredItems = foundItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );


  const getTargetItem = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.products}>
      {filteredItems.map((elem) => (
        <div
          key={elem.id}
          className={styles.card}
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
          <div className={styles.card__title}>{elem.title}</div>
          <div className={styles.card__rating}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={styles.card__rating_star}>
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
          <div className={styles.card__price}>{elem.price} &#8381;</div>
        </div>
      ))}
    </div>
  );
};
