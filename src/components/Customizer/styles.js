import styled, { css } from 'styled-components';
import { spinKeyframes } from '@common/animations';

export const CustomizerContainer = styled.div`
  width: 400px;
  right: -400px;
  padding: 0;
  background-color: ${(props) => props.theme.genericColors.white};
  z-index: 1051;
  position: fixed;
  padding: 1rem;
  top: 0;
  bottom: 0;
  height: 100vh;
  transition: right 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);
  backface-visibility: hidden;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  color: ${(props) => props.theme.genericColors.black};
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  padding-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 320px;
    right: -320px;
  }
  ${({ open }) =>
    open &&
    css`
      right: 0 !important;
    `}
  .close-button {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .customizer-content {
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .open-icon {
    animation: ${spinKeyframes} 2s infinite linear;
    position: relative;
  }

  .title {
    text-align: left;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  .sub-title {
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.genericColors.gray};
  }
  .option-title {
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.fontSize.md};
    color: ${(props) => props.theme.genericColors.gray};
  }
  .field-title {
    width: 100%;
    margin-bottom: -1rem;
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.genericColors.gray};
  }
  .section {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
    padding: 2rem 0;
    .input {
      margin: 1.5rem 0;
    }
  }
  .submit-button {
    ${({ theme }) => theme.mixins.bigButton};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.brand.primary};
    color: white;
    margin-top: 1rem;
    width: 100%;
    &:hover,
    &:focus,
    &:active {
      color: ${(props) => props.theme.genericColors.black};
    }
  }
`;

export const CustomizerToggle = styled.button`
  background: ${(props) => props.theme.brand.primary};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -3px 0px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  left: -40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;

export const ColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ColorSelectorItem = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 0.375rem;
  margin: 1rem;
  background: ${(props) => props.color};
  cursor: pointer;
  transition: ${(props) => props.theme.transitions.default};
  &:after {
    opacity: 0;
    content: '';
    top: -4px;
    left: -4px;
    border-radius: 0.375rem;
    display: block;
    width: 50px;
    height: 50px;
    position: absolute;
    border: 2px solid ${(props) => props.color};
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
  ${({ selected }) =>
    selected &&
    css`
      &:after {
        opacity: 1;
      }
    `}
`;
