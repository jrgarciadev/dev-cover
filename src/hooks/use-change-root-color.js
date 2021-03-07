export const useChangeRootColor = (color, rootColor = 'primary') => {
  if (typeof document !== 'undefined' && color) {
    const root = document.documentElement;
    root.style.setProperty(`--colors-${rootColor}`, color);
  }
};
