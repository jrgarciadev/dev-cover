import mixins from '@styles/mixins';

export default {
  borderRadius: '1.375rem',
  borderRadiusButton: '2.375rem',
  hamburgerWidth: '3rem',
  fontFamily: {
    fontSans: 'Roboto, -apple-system, BlinkMacSystemFont,Segoe UI, Helvetica, Arial',
    fontMono: 'Space Mono, SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
  },
  brand: {
    primary: '#1ee0e0',
    secondary: '#3E5FA8',
    accent: '#5FC921',
  },
  fontSize: {
    xxs: '0.9rem',
    xs: '1.1rem',
    sm: '1.3rem',
    md: '1.5rem',
    lg: '1.8rem',
    xl: '2.2rem',
    xxl: '3rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1200px',
  },
  fontw: {
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  transitions: {
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    default: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
    hamBefore: 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in',
    hamBeforeActive: 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s',
    hamAfter: 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    hamAfterActive:
      'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s',
  },
  mixins,
};
