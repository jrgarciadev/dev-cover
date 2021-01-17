import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

export const TransitionStyles = css`
  /* Fade up */
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 300ms ${(props) => props.theme.transitions.easing},
      transform 300ms ${(props) => props.theme.transitions.easing};
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ${(props) => props.theme.transitions.easing},
      transform 300ms ${(props) => props.theme.transitions.easing};
  }

  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 300ms ${(props) => props.theme.transitions.easing},
      transform 300ms var(--easing);
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms ${(props) => props.theme.transitions.easing},
      transform 300ms ${(props) => props.theme.transitions.easing};
  }

  /* Fade */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ${(props) => props.theme.transitions.easing};
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ${(props) => props.theme.transitions.easing};
  }
`;
