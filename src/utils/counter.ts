import { useState } from "react";

function useCounter(initialState: number) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue(value + 1);

  return { value, add, reset };
}

export { useCounter };
