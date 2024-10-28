import { useNavigate } from "react-router-dom";
import replaceImage from "../../../utils/replaceImage";
import truncateText from "../../../utils/truncateText";
import styles from "./SingleProduct.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Item } from "../../../store/modules/items/types";

//карточка товара
export const SingleProduct = ({
  id,
  title,
  picture,
  rating,
  price,
}: Item): JSX.Element => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  return (
    <div ref={parent} key={id}>
      <div
        className={styles.card}
        onClick={() => {
          navigate(`/products/${id}`);
        }}
      >
        <img
          src={picture}
          alt={truncateText(title, 2)}
          width={250}
          height={250}
          onError={(e) => replaceImage(e)}
        />
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={styles.card__rating_star}>
              <img
                src={
                  i < Math.floor(rating)
                    ? `${"/svg/FullStar.svg"}`
                    : i < rating
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
        <div className={styles.card__price}>{price} &#8381;</div>
      </div>
    </div>
  );
};
