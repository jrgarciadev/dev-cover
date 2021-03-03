import { useState } from 'react';

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue !== undefined ? initialValue : null);
  const onChange = (val) => setValue(val);
  return { value, onChange };
};
