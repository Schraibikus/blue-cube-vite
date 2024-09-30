const replaceImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const defaultImage = "/not-image.jpg";
  (e.target as HTMLImageElement).src = defaultImage;
};

export default replaceImage;
