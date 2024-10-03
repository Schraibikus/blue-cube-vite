const replaceImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).src = "/not-image.jpg";
};

export default replaceImage;
