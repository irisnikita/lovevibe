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

/**
 * Copies the specified value to the clipboard.
 * @param {string} value - The value to be copied to the clipboard.
 * @returns {void}
 */
export function copyValueToClipboard(value: string) {
  // Create a temporary input element
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = '0';

  // Set the input value to the specified value
  input.value = value;

  // Append the input element to the DOM
  document.body.appendChild(input);

  // Select the input's content
  input.select();
  input.setSelectionRange(0, 99999);

  // Copy the selected content to the clipboard
  navigator.clipboard.writeText(value);

  // Remove the input element from the DOM
  document.body.removeChild(input);
}
