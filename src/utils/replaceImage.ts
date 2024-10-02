const replaceImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  // const defaultImage = "/not-image.jpg";
  // (e.target as HTMLImageElement).src = defaultImage;
  (e.target as HTMLImageElement).src = "/not-image.jpg";
};

export default replaceImage;
