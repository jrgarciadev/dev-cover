import React from 'react';
import { useToasts } from '@contexts/toasts';
import {
  ToastsContainer,
  ErrorToast,
  SuccessToast,
  NeutralToast,
  PrimaryToast,
  WarningToast,
} from './styles';

export const ToastsType = {
  ERROR: 'error',
  SUCCESS: 'success',
  NEUTRAL: 'neutral',
  PRIMARY: 'primary',
  WARNING: 'warning',
};

const Toasts = () => {
  const { toasts } = useToasts();

  if (!toasts || toasts.length === 0 || !Array.isArray(toasts)) {
    return null;
  }

  return (
    <ToastsContainer>
      {toasts &&
        toasts.map((toast) => {
          const { kind, timeout, message, id } = toast;
          switch (kind) {
            case ToastsType.ERROR: {
              let cleanedMessage = message;
              if (message.indexOf('GraphQL error: ') >= 0) {
                cleanedMessage = message.replace('GraphQL error: ', '');
              }
              return (
                <ErrorToast key={id} timeout={timeout}>
                  {cleanedMessage}
                </ErrorToast>
              );
            }
            case ToastsType.SUCCESS: {
              return (
                <SuccessToast key={id} timeout={timeout}>
                  {message}
                </SuccessToast>
              );
            }
            case ToastsType.NEUTRAL: {
              return (
                <NeutralToast key={id} timeout={timeout}>
                  {message}
                </NeutralToast>
              );
            }
            case ToastsType.PRIMARY: {
              return (
                <PrimaryToast key={id} timeout={timeout}>
                  {message}
                </PrimaryToast>
              );
            }
            case ToastsType.WARNING: {
              return (
                <WarningToast key={id} timeout={timeout}>
                  {message}
                </WarningToast>
              );
            }
            default: {
              return null;
            }
          }
        })}
    </ToastsContainer>
  );
};

export default Toasts;
