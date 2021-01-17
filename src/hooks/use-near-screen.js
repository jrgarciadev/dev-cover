import { useEffect, useState, useRef } from 'react';

const isBrowser = typeof window !== `undefined`;

const useNearScreen = ({ externalRef = null, once = true } = {}) => {
  if (!isBrowser) return null;
  const [show, setShow] = useState(false);
  const element = externalRef !== null && externalRef !== undefined ? externalRef : useRef(null);
  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
        ? window.IntersectionObserver
        : import('intersection-observer'), // Polyfill - For not supported browsers
    ).then(() => {
      const observer = new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShow(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShow(false);
        }
      });
      if (element && element.current) {
        observer.observe(element.current);
      }
    });
  }, [element]);
  return [show, element];
};

export default useNearScreen;
