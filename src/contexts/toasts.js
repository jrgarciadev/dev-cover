/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState, useMemo } from 'react';
import { ToastsType } from '@components/Toasts';

export const ToastsContext = createContext();

export const useToasts = () => useContext(ToastsContext);

const Provider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((next) => {
    setToasts((last) => [...last, next]);
  }, []);

  const removeToast = useCallback((id) => {
    const newToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(newToasts);
  }, []);

  const addToastWithTimeout = useCallback((kind, message) => {
    let nextToastId = toasts.length;
    let timeout = 6000;
    if (kind === ToastsType.SUCCESS) timeout = 5000;
    if (kind === ToastsType.WARNING) timeout = 8000;
    if (kind === ToastsType.ERROR) timeout = 10000;
    let id = nextToastId++;

    addToast({ id, kind, message, timeout });

    setTimeout(() => {
      removeToast(id);
      id = nextToastId--;
    }, timeout);
  }, []);

  const restartValues = () => setToasts([]);

  const initialValue = useMemo(
    () => ({
      toasts,
      addToast,
      ToastsType,
      addToastWithTimeout,
      removeToast,
      restartValues,
    }),
    [toasts, ToastsType, addToast, removeToast, addToastWithTimeout],
  );
  return <ToastsContext.Provider value={initialValue}>{children}</ToastsContext.Provider>;
};
export default { Provider, Consumer: ToastsContext.Consumer };
