/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState, useMemo } from 'react';

export const UIContext = createContext();

export const useUIContext = () => useContext(UIContext);

const initialData = {
  isEditable: false,
  mainFullHeight: true,
  showNavbar: true,
  showDeployButton: false,
  showCustomizer: false,
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
  return <UIContext.Provider value={initialValue}>{children}</UIContext.Provider>;
};
export default { Provider, Consumer: UIContext.Consumer };
