//служит для замены незагрузившихся картинок на заглушку
const replaceImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).src = "/no_image.jpg";
};

export default replaceImage;
