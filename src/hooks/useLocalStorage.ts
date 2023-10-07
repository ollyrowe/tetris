import { useEffect, useState, Dispatch, SetStateAction } from "react";

/**
 * A wrapper around useState that persists the value to local storage.
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(getItem(key, initialValue));

  useEffect(() => setItem(key, value), [key, value]);

  return [value, setValue];
};

const getItem = <T>(key: string, defaultValue: T): T => {
  const item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
};

const setItem = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
