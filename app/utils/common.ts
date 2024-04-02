export const getImageRatio = (image: HTMLImageElement) => {
  const {width, height} = image;

  return width / height;
};

export const convertToGPSCoordinatesWithDirections = (
  latitude: number,
  longitude: number,
) => {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const longDirection = longitude >= 0 ? 'E' : 'W';

  return `${Math.abs(latitude)}° ${latDirection}, ${Math.abs(
    longitude,
  )}° ${longDirection}`;
};
