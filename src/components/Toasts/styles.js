import styled, { keyframes } from 'styled-components';
import { prop } from 'styled-tools';

export const ToastsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 8rem;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  background: transparent;
  pointer-events: none;
  z-index: 9997;

  @media (max-width: ${prop('theme.breakpoints.sm')}) {
    bottom: 40px;
    left: 0;
    bottom: 6.5rem;
    max-width: 100%;
  }
`;

const toastFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  5% {
    opacity: 1;
    transform: translateY(0px);
  }
  95% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
`;

const Toast = styled.div`
  border-radius: 4px;
  padding: 1.5rem 2.4rem;
  color: #fff;
  font-size: ${prop('theme.fontSize.sm')};
  font-weight: ${prop('theme.fontw.semibold')};
  line-height: 1.4;
  display: block;
  margin-bottom: 8px;
  box-shadow: ${prop('theme.shadows.small')};
  opacity: 0;
  position: relative;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-name: ${toastFade};
  animation-timing-function: linear;
`;

export const ErrorToast = styled(Toast)`
  background-color: ${prop('theme.brand.danger')};
`;

export const SuccessToast = styled(Toast)`
  background-color: ${prop('theme.brand.primary')};
  color: ${prop('theme.genericColors.white')};
  box-shadow: ${prop('theme.shadows.small')};
`;

export const NeutralToast = styled(Toast)`
  background-color: ${'prop(theme.background'};
  color: ${prop('theme.brand.primary')};
`;

export const PrimaryToast = styled(Toast)`
  background-color: ${prop('theme.brand.primary')};
  color: ${prop('theme.genericColors.black')};
`;

export const WarningToast = styled(Toast)`
  background-color: ${prop('theme.brand.warning')};
  color: ${prop('theme.genericColors.black')};
`;
