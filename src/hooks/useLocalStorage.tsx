import { useState } from 'react';

function getItem (item: string, defaultValue?: unknown) {
  const storedItem = localStorage.getItem(item);

  if (!storedItem) {
    defaultValue && localStorage.setItem(item, JSON.stringify(defaultValue))

    return defaultValue;
  }

  return JSON.parse(storedItem);
}

export function useLocalStorage<T> (item: string, defaultValue?: T): [T, (data: T | ((data: T) => T)) => void] {
  const [data, setData] = useState<T>(getItem(item, defaultValue));

  function setItems (value: T | ((value: T) => T)) {
    try {
      const newValue = value instanceof Function ? value(data) : value;

      localStorage.setItem(item, JSON.stringify(newValue));
      setData(value);
    } catch (error) {
      console.warn(`Error setting localStorage key "${item}": ${error.message}`);
    }
  }

  return [data, setItems];
}