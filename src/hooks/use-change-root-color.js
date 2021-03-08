import { isEmpty } from 'lodash';

export const useChangeRootColor = (color, rootColor = 'primary') => {
  if (typeof document !== 'undefined' && !isEmpty(color)) {
    const root = document.documentElement;
    const currentColor = root.style.getPropertyValue(`--colors-${rootColor}`);
    if (currentColor !== color) {
      root.style.setProperty(`--colors-${rootColor}`, color);
    }
  }
};
