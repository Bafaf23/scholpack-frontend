import { useState, useEffect } from "react";

/**
 * Custom hook para aplicar debounce a un valor
 * @param {any} value - El valor a retrasar (ej. texto de búsqueda)
 * @param {number} delay - Tiempo de espera en milisegundos (por defecto 400ms)
 * @returns {any} El valor actualizado tras el delay
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(time);
    };
  }, [delay, value]);

  return debouncedValue;
}
