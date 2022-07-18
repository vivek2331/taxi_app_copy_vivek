import { useState, useEffect } from "react";
function useLocalState(defaultValue, key) {
  const [value, setvalue] = useState(() => {
    const localStoragevalue = localStorage.getItem(key);
    return localStoragevalue !== null
      ? JSON.parse(localStoragevalue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setvalue];
}

export { useLocalState };
