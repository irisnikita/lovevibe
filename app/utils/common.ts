export const getImageRatio = (image: HTMLImageElement) => {
  const {width, height} = image;

  return width / height;
};
