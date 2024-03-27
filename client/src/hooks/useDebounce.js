import React, { useEffect, useState } from "react";

const useDebounce = (text, time = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(text);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(text);
    }, time);

    return () => {
      clearTimeout(id);
    };
  }, [time, text]);

  return debouncedValue;
};

export default useDebounce;
