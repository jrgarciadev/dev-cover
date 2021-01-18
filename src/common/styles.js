import styled, { css } from 'styled-components';
import { hexa } from '@utils';

export const StyledMainContainer = styled.section`
  width: 100%;
  max-width: 900px;
  counter-reset: section;
  section {
    margin: 0 auto;
    padding: 100px 0;
  }
`;

export const NumberedHeading = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, ${(props) => props.theme.fontSize.xl});
  font-weight: ${(props) => props.theme.fontw.semibold};
  white-space: nowrap;

  &:before {
    position: relative;
    bottom: 0px;
    counter-increment: section;
    content: '0' counter(section) '.';
    margin-right: 1rem;
    color: ${(props) => props.theme.brand.primary};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: clamp(
      ${(props) => props.theme.fontSize.md},
      3vw,
      ${(props) => props.theme.fontSize.lg}
    );
    font-weight: ${(props) => props.theme.fontw.regular};

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      margin-bottom: -3px;
      margin-right: 5px;
    }
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    top: 0px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: ${(props) => hexa(props.theme.brand.primary, 0.4)};

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
      width: 200px;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      width: 100%;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      margin-left: 10px;
    }
  }

  ${({ overline, theme }) =>
    overline &&
    css`
      display: block;
      margin-bottom: 20px;
      color: ${theme.brand.primary};
      font-family: ${theme.fontFamily.fontMono};
      font-size: ${theme.fontSize.md};
      font-weight: 400;

      &:before {
        bottom: 0;
        font-size: ${theme.fontSize.sm};
      }

      &:after {
        display: none;
      }
    `}
`;

export const Gradient = (g1, g2) =>
  css`
    background-image: radial-gradient(ellipse farthest-corner at top left, ${g1} 0%, ${g2} 100%);
  `;
