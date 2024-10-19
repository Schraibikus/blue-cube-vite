// служит для форматирования даты
import dayjs from "dayjs";
import "dayjs/locale/ru";

const formatDate = (date: Date | string): string => {
  return dayjs(date).locale("ru").format("DD MMMM YYYY");
};

export default formatDate;
