import { keyframes, css } from 'styled-components';

export const fadeInKeyframes = keyframes`
  from {
    filter: blur(5px);
    opacity: 0
  }

  to {
    filter: blur(0);
    opacity: 1
  }
`;

export const spinKeyframes = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const fadeOutKeyframes = keyframes`
  from {
    filter: blur(0);
    opacity: 1
  }
  to {
    filter: blur(5px);
    opacity: 0
  }
`;

export const slideUpKeyFrame = (height) => keyframes`
 from {
    transform: translateY(${height})
  }
  to {
    transform: translateY(0px)
  }
`;

export const slideDownKeyFrame = (height) => keyframes`
 from {
    transform: translateY(0px)
  }
  to {
    transform: translateY(${height})
  }
`;

export const loadBlur = keyframes`
  from {
    filter: blur(5px);
    clippath: inset(0);
  }

  to {
    filter: blur(0);
    clippath: inset(0);
  }
`;

export const slideRightKeyframes = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
  `;

export const skeletonKeyFrames = keyframes`
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  `;

export const slideLeftKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
  `;

export const skeletonLoading = ({ time = '6s', type = 'ease-in-out' } = {}) => css`
  animation: ${time} ${skeletonKeyFrames} ${type} infinite;
`;

export const slideUp = ({ time = '1s', height = '60vh', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${slideUpKeyFrame(height)} ${type};
  `;

export const slideDown = ({ time = '1s', height = '60vh', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${slideDownKeyFrame(height)} ${type};
  `;

export const fadeIn = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${fadeInKeyframes} ${type};
  `;

export const fadeOut = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${fadeOutKeyframes} ${type};
  `;

export const slideRight = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${slideRightKeyframes} ${type};
  `;

export const slideLeft = ({ time = '1s', type = 'ease' } = {}) =>
  css`
    animation: ${time} ${slideLeftKeyframes} ${type};
  `;

export const circleKeyframes = keyframes`
   0%
    {
        -webkit-transform: rotate(0);
            -ms-transform: rotate(0);
             -o-transform: rotate(0);
                transform: rotate(0);
    }
    100%
    {
        -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
             -o-transform: rotate(360deg);
                transform: rotate(360deg);
    }
  `;

export const circleLoader = ({ time = '.75s', type = 'infinite' } = {}) =>
  css`
    -webkit-animation: ${time} ${circleKeyframes} ${type};
    -moz-animation: ${time} ${circleKeyframes} ${type};
    -o-animation: ${time} ${circleKeyframes} ${type};
    animation: ${time} ${circleKeyframes} ${type};
  `;
