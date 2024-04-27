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

export const safeParseJson = (json: string): Record<string, any> => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

export const numberTwoDigits = (number: number) => {
  return number < 10 ? `0${number}` : number;
};
