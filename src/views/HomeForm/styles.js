import styled, { css } from 'styled-components';
import { Gradient } from '@common/styles';
import { prop } from 'styled-tools';

export const StyledContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  min-height: calc(100vh - 70px);
  flex-direction: column;
`;

export const LargeLogo = styled.img`
  max-width: 360px;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    max-width: 280px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 8rem;
  text-align: center;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({ theme }) => theme.fontw.bold};
  background-size: 300%;
  background-image: ${({ theme }) =>
    `linear-gradient(45deg, ${theme.brand.primary}, ${theme.bg.reverse})`};
  position: relative;
  z-index: 1;
  margin: 2rem 0;
  animation: flow 5s ease-in-out infinite;
  @keyframes flow {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 3rem;
    margin: 4rem 0;
  }
`;

export const StyledInput = styled.input`
  ${({ theme }) => theme.mixins.bigInput};
  font-size: ${({ theme }) => theme.fontSize.xl};
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.brand.danger};
    `}
`;

export const StyledButton = styled.button`
  ${({ theme }) => theme.mixins.bigButton};
  ${({ theme }) => Gradient(theme.brand.primary, theme.bg.reverse)};
  transition: ${({ theme }) => theme.transitions.default};
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    &:hover {
      transform: translateX(14px);
    }
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${StyledInput} {
    margin-right: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    ${StyledInput} {
      width: 100%;
      max-width: 100%;
      margin-right: 0rem;
      margin-bottom: 1rem;
    }
    ${StyledButton} {
      width: 100%;
    }
  }
`;

export const StyledErrorMessage = styled.p`
  padding: 1rem 0;
  color: ${(props) => props.theme.brand.danger};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-family: ${(props) => props.theme.fontFamily.fontMono};
`;

export const ProductHuntContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
`;

export const RemainingPortfolios = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 2rem;
  left: 46%;
  p {
    color: ${prop('theme.text.accent')};
  }
  .github-rate {
    margin-top: 0.5rem;
    color: ${prop('theme.brand.danger')};
  }
  a {
    color: ${prop('theme.text.accent')};
    &:hover {
      color: ${prop('theme.brand.primary')};
    }
  }
`;
