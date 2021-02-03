import styled, { css } from 'styled-components';

export const InputWrapper = styled.div`
  min-width: ${(props) =>
    props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '200px'};
  width: ${(props) =>
    props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '200px'};
  width: ${(props) => props.fullWidth && '100%'};
  align-items: center;
  border: 1.5px solid ${(props) => props.theme.accents.a3};
  display: inline-flex;
  height: ${(props) =>
    props.multiline
      ? 'auto'
      : props.size === 'sm'
      ? '3.6rem'
      : props.size === 'lg'
      ? '4.2rem'
      : '3.2rem'};
  padding: 0 10px;
  min-height: ${(props) => props.multiline && `4.2rem`};
  position: relative;
  background-color: ${(props) => props.theme.background};
  border-radius: ${(props) => props.theme.radius.md};
  transition: border 0.2s ease, color 0.2s ease;
  vertical-align: middle;
  .input-wrapper {
    display: block;
    margin: 0 10px;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .input-wrapper__highlighter,
  .input-wrapper__control {
    height: 100%;
  }

  .error-label {
    color: ${(props) => props.theme.brand.danger};
    font-size: ${(props) => props.theme.fontSize.md};
    position: relative;
    top: ${(props) => (props.multiline ? '2.5rem' : '0.5rem')};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.accents.a7};
    `}

  textarea {
    word-break: break-word;
    padding: 1.4rem 0;
    max-height: 340px;
  }
  input {
    height: 100%;
  }
  input,
  textarea {
    font-family: ${(props) => props.theme.fontFamily.fontSans};
    background-color: transparent;
    border-radius: 0;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    display: block;
    font-weight: ${(props) => props.theme.fontw.light};
    font-size: ${(props) => props.theme.fontSize.md};
    line-height: 1.5;
    outline: 0;
    width: 100%;
    color: ${(props) => props.theme.reverse};
    ${({ size, theme }) =>
      size &&
      size === 'sm' &&
      css`
        font-size: ${theme.fontSize.sm} !important;
      `}
    ${({ size, theme }) =>
      size &&
      size === 'lg' &&
      css`
        font-size: ${theme.fontSize.lg} !important;
      `}
    ${({ size, theme }) =>
      size &&
      size === 'xl' &&
      css`
        font-size: ${theme.fontSize.xl} !important;
      `}
  }

  input:disabled,
  textarea:disabled {
    color: ${(props) => props.theme.text.inactive};
  }

  input:disabled::placeholder,
  textarea:disabled::placeholder {
    color: ${(props) => props.theme.text.inactive};
  }

  .icon {
    cursor: ${(props) => (props.iconCursor ? props.iconCursor : '')};
    align-items: center;
    display: flex;
    height: 100%;
    vertical-align: middle;
  }

  .icon ~ .input-wrapper {
    margin-left: 0;
  }

  &:hover {
    border-color: ${(props) => props.theme.brand.primary};
  }

  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.brand.danger};
      input {
        color: ${theme.brand.danger};
      }
    `}

  ${({ focused, theme }) =>
    focused &&
    css`
      border-color: ${theme.brand.primary};
    `}

  ${({ focused, error, theme }) =>
    focused &&
    error &&
    css`
      border-color: ${theme.brand.danger};
      color: ${theme.brand.danger};
    `}
`;

export const Label = styled.div`
  height: 100%;
  border-width: 0px;
  padding: 0 10px;
  border-right-width: 1px;
  border-color: ${(props) => props.theme.accents.a3};
  border-style: solid;
  background-color: ${(props) => props.theme.background};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: ${(props) => props.theme.accents.a4};
  font-size: ${(props) => props.theme.fontSize.md};
  line-height: 1;
  margin-top: 0px;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  width: initial;
`;
