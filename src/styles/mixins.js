import { css } from 'styled-components';
import { hexa } from '@utils';

const button = css`
  color: ${(props) => props.theme.brand.primary};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.brand.primary};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily.fontMono};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: ${(props) => props.theme.transitions.default};
  padding: 1.25rem 1.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: ${(props) => hexa(props.theme.brand.primary, 0.1, true)};
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${(props) => props.theme.transitions.default};
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.brand.primary};
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: ${(props) => props.theme.transitions.default};
    cursor: pointer;
    color: ${(props) => props.theme.brand.primary};
    &:hover,
    &:focus,
    &:active {
      color: ${(props) => props.theme.brand.primary};
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: ${(props) => props.theme.brand.primary} !important;
        transition: ${(props) => props.theme.transitions.default};
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      position: relative;
      top: 0.1em;
      background-color: ${(props) => props.theme.brand.primary};
      transition: ${(props) => props.theme.transitions.default};
      opacity: 0.5;
    }
  `,

  button,
  smallButton: css`
    color: ${(props) => props.theme.brand.primary};
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.brand.primary};
    border-radius: ${(props) => props.theme.borderRadiusButton};
    padding: 0.75rem 1.5rem;
    font-size: ${(props) => props.theme.fontSize.xs};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${(props) => props.theme.transitions.default};
    &:hover,
    &:focus,
    &:active {
      background-color: ${(props) => hexa(props.theme.brand.primary, 0.1, true)};
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    padding: 1.25rem 1.75rem;
    background-color: transparent;
    color: ${(props) => props.theme.brand.primary};
    border: 2px solid ${(props) => props.theme.brand.primary};
    border-radius: ${(props) => props.theme.borderRadius};
    font-size: ${(props) => props.theme.fontSize.sm};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: ${(props) => props.theme.transitions.default};
    &:hover,
    &:focus,
    &:active {
      background-color: ${(props) => hexa(props.theme.brand.primary, 0.1, true)};
    }
    &:after {
      display: none !important;
    }
  `,
  bigInput: css`
    display: block;
    appearance: none;
    outline: 0;
    border: 2px solid ${({ theme }) => theme.bg.reverse};
    background-color: transparent;
    max-width: 380px;
    width: 340px;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 1.5rem 1rem;
    display: block;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.text.default};
    font-weight: ${({ theme }) => theme.fontw.semibold};
    transition-duration: 0.25s;
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.brand.primary};
    }
    &:focus {
      width: 380px;
    }
  `,
  boxShadow: css`
    box-shadow: ${(props) => props.theme.shadows.default};
    transition: ${(props) => props.theme.transitions.default};
    &:hover,
    &:focus {
      box-shadow: ${(props) => props.theme.shadows.medium};
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: ${(props) => props.theme.fontSize.lg};
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.brand.primary};
      }
    }
  `,
};

export default mixins;
