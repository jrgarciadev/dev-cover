import styled from 'styled-components';
import { hexa } from '@utils';

export const StyledContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  min-height: calc(100vh - 70px);
  flex-direction: column;
  h1,
  b {
    margin: 1rem 0;
    font-size: ${(props) => props.theme.fontSize.xl};
  }
  b {
    color: ${(props) => props.theme.brand.primary};
    text-decoration: underline;
  }
`;

export const BrandButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  min-width: 320px;
  background-color: ${(props) => props.color};
  border-width: 0px;
  display: flex;
  align-items: center;
  p {
    color: white;
  }
  &:hover {
    background-color: ${(props) => hexa(props.color, 0.8)};
  }
`;

export const SuggestedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    margin: 2rem 0;
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  svg {
    fill: ${(props) => props.theme.bg.reverse};
    margin-right: 1rem;
    width: 28px;
    height: 28px;
    &:hover {
      fill: ${(props) => props.theme.brand.primary};
    }
  }
  ${BrandButton} {
    margin: 1rem 0;
  }
`;
