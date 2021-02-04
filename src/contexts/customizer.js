/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState, useMemo } from 'react';
import { IS_GENERATOR } from '@lib/constants';

const username = process.env.NEXT_PUBLIC_USERNAME;
const isLivePortfolio = username && !IS_GENERATOR;

export const CustomizerContext = createContext();

export const useCustomizerContext = () => useContext(CustomizerContext);

const initialData = {
  primaryColor: isLivePortfolio ? 'transparent' : '#1ee0e0',
};

const Provider = ({ children }) => {
  const [value, setValue] = useState(initialData);

  const updateValue = useCallback((next) => {
    setValue((last) => {
      const newValue = { ...last, ...next };
      return newValue;
    });
  }, []);

  const restartValues = () => setValue(initialData);

  const initialValue = useMemo(
    () => ({
      ...value,
      updateValue,
      restartValues,
    }),
    [value, updateValue],
  );
  return <CustomizerContext.Provider value={initialValue}>{children}</CustomizerContext.Provider>;
};
export default { Provider, Consumer: CustomizerContext.Consumer };
