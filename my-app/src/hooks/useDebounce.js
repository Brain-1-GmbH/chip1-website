import { useState } from "react";
import axios from 'axios';

/**
 *
 * @param {Function} func
 * @param {number} delay
 */
export const useDebounce = (func, delay) => {
  const [timer, setTimer] = useState();

  const debouncedFunction = (...args) => {
    const newTimer = setTimeout(() => {
      func(...args, axios);
    }, delay);
    clearTimeout(timer);
    setTimer(newTimer);
  };

  return debouncedFunction;
};
