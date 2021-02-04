import { useEffect, useRef, useState } from 'react';
import { isIos } from '@utils';

const touchHandler = (event) => {
  if (event.touches && event.touches.length > 1) return true;
  event.preventDefault();
  return false;
};

const defaultOptions = {
  scrollLayer: false,
};

const elementStack = new Map();

export const useBodyScroll = (elementRef, options) => {
  /* istanbul ignore next */
  if (typeof document === 'undefined') return [false, false];
  const elRef = elementRef || useRef(document.body);
  const [hidden, setHidden] = useState(false);
  const safeOptions = {
    ...defaultOptions,
    ...(options || {}),
  };

  // don't prevent touch event when layer contain scroll
  const isIosWithCustom = () => {
    if (safeOptions.scrollLayer) return false;
    return isIos();
  };

  useEffect(() => {
    if (!elRef || !elRef.current) return;
    const lastOverflow = elRef.current.style.overflow;
    if (hidden) {
      if (elementStack.has(elRef.current)) return;
      if (!isIosWithCustom()) {
        elRef.current.style.overflow = 'hidden';
      } else {
        document.addEventListener('touchmove', touchHandler, { passive: false });
      }
      elementStack.set(elRef.current, {
        last: lastOverflow,
      });
      return;
    }

    // reset element overflow
    if (!elementStack.has(elRef.current)) return;
    if (!isIosWithCustom()) {
      const store = elementStack.get(elRef.current);
      elRef.current.style.overflow = store.last;
    } else {
      document.removeEventListener('touchmove', touchHandler);
    }
    elementStack.delete(elRef.current);
  }, [hidden, elRef]);

  return [hidden, setHidden];
};
