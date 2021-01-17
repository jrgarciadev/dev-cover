import styled from 'styled-components';

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
  background-image: ${({ theme }) =>
    `linear-gradient(-90deg, ${theme.brand.primary}, ${theme.bg.reverse})`};
  position: relative;
  z-index: 1;
  margin: 2rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 3rem;
    margin: 4rem 0;
  }
`;

export const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  ${({ theme }) => theme.mixins.bigInput};
`;
