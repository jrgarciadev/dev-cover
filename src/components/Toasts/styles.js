import styled, { keyframes } from 'styled-components';

export const ToastsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  background: transparent;
  pointer-events: none;
  z-index: 9997;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    bottom: 40px;
    left: 0;
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
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontw.semibold};
  line-height: 1.4;
  display: block;
  margin-bottom: 8px;
  box-shadow: ${(props) => props.theme.shadows.small};
  opacity: 0;
  position: relative;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-name: ${toastFade};
  animation-timing-function: linear;
`;

export const ErrorToast = styled(Toast)`
  background-color: ${(props) => props.theme.brand.danger};
`;

export const SuccessToast = styled(Toast)`
  background-color: ${(props) => props.theme.brand.success};
  color: ${(props) => props.theme.genericColors.black};
`;

export const NeutralToast = styled(Toast)`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.brand.primary};
`;

export const PrimaryToast = styled(Toast)`
  background-color: ${(props) => props.theme.brand.primary};
  color: ${(props) => props.theme.genericColors.black};
`;

export const WarningToast = styled(Toast)`
  background-color: ${(props) => props.theme.brand.warning};
  color: ${(props) => props.theme.genericColors.black};
`;
