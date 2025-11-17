import { useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function useLocalStorage(key, initialValue) {
  /** Generic localStorage hook with safe JSON parse and debounced writes */
  const read = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(read);
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // ignore
      }
    }, 350);
  }, [key, value]);

  return [value, setValue];
}
