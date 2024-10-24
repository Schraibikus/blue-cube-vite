//служит для обрезания слишком длинного текста
const truncateText = (text: string, limit: number): string => {
  return (
    text.split(" ").slice(0, limit).join(" ") +
    (text.split(" ").length > limit ? "..." : "")
  );
};

export default truncateText;
