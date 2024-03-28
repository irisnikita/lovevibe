import { useDebounce } from './useDebounceV2';

export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500,
): T {
  const debouncedCallback = useDebounce(callback, delay);

  return debouncedCallback;
}
