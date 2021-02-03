import styled from 'styled-components';
import { hexa } from '@utils';

export const SwitchContainer = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  line-height: 2rem;
`;

export const SwitchInput = styled.input`
  /* Hide the default */
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:hover ~ label:before {
    background-color: ${(props) => props.theme.background};
    border-color: rgba(0, 0, 0, 0.4);
  }
  &:focus ~ label:before {
    border-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px ${(props) => hexa(props.theme.brand.primary, 0.6)};
  }
  &:checked ~ label:before {
    transition: all 400ms ease;
    background-color: ${(props) => props.theme.brand.primary};
    border-color: ${(props) => props.theme.brand.primary};
  }
  &:checked:focus ~ label:before {
    border-color: ${(props) => props.theme.brand.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.brand.primary};
  }
  &:checked ~ label:after {
    top: 0.4rem;
    left: 1.5rem;
    background-color: ${(props) => props.theme.genericColors.white};
    border-color: ${(props) => props.theme.background};
  }
  &:disabled ~ label {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:disabled ~ label:before {
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => hexa(props.theme.reverse, 0.3)};
  }
  &:disabled:checked ~ label:before {
    background-color: ${(props) => props.theme.brand.primary};
    border-color: ${(props) => props.theme.brand.primary};
  }
  &:hover:disabled:checked ~ label:before {
    background-color: ${(props) => props.theme.brand.primary};
    border-color: ${(props) => props.theme.brand.primary};
  }
`;

export const SwitchLabel = styled.label`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontw.regular};
  font-family: ${(props) => props.theme.fontFamily.fontSans};
  color: ${(props) => props.theme.accents.a4};
  padding: 0.2rem 0;
  margin-bottom: 0;
  margin: 0 auto;
  padding-left: 4rem;
  cursor: pointer;
  user-select: none;
  .blank {
    padding-left: 3.2rem;
  }

  &:before {
    transition: all 400ms ease;
    content: '';
    display: inline-block;
    position: absolute;
    height: 2.4rem;
    width: 3.6rem;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.background};
    border: 1px solid ${(props) => hexa(props.theme.reverse, 0.3)};
    border-radius: 3rem;
  }
  &:after {
    content: '';
    position: absolute;
    height: 1.6rem;
    width: 1.6rem;
    top: 0.4rem;
    left: 0.5rem;
    background-color: ${(props) => props.theme.brand.primary};
    border: 0 solid ${(props) => hexa(props.theme.reverse, 0.2)};
    border-radius: 50%;
  }
`;
