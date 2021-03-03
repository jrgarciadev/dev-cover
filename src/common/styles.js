import styled, { css } from 'styled-components';
import { hexa } from '@utils';
import { circleLoader } from './animations';

export const StyledMainContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  counter-reset: section;
  section {
    margin: 0 auto;
    padding: 100px 0;
  }
`;

export const SectionButton = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  width: 100%;
  button {
    ${({ theme }) => theme.mixins.bigButton};
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
`;

export const NumberedHeading = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, 4rem);
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
      ${(props) => props.theme.fontSize.lg},
      3vw,
      ${(props) => props.theme.fontSize.xl}
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
    width: 300px;
    height: 2px;
    position: absolute;
    top: 6rem;
    left: 0;
    background-color: ${(props) => props.theme.brand.primary};
    opacity: 0.5;
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
      width: 200px;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      width: 100px;
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

export const Loader = styled.div`
  ${circleLoader({ time: '0.75s' })};
  position: ${(props) => props.position || 'relative'};
  width: ${(props) => props.size || '4rem'};
  height: ${(props) => props.size || '4rem'};
  margin-left: ${(props) => props.ml || '0px'};
  margin-right: ${(props) => props.mr || '0px'};
  margin-top: ${(props) => props.mt || '0px'};
  margin-bottom: ${(props) => props.mb || '0px'};
  border: 2px solid ${(props) => props.theme.brand.primary};
  border-top-color: ${(props) => hexa(props.theme.bg.reverse, 0.2)};
  border-right-color: ${(props) => hexa(props.theme.bg.reverse, 0.2)};
  border-bottom-color: ${(props) => hexa(props.theme.bg.reverse, 0.2)};
  border-radius: 100%;
  ${({ left }) => left && `left: ${left}`};
  ${({ right }) => right && `right: ${right}`};
  ${({ top }) => top && `top: ${top}`};
  ${({ bottom }) => bottom && `bottom: ${bottom}`};
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => props.height || '80vh'};
  justify-content: center;
  align-items: center;
`;

export const TruncatedText = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0; /* or some value */
  p,
  b {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${({ height }) =>
    css`
      line-height: ${height};
    `}
`;

export const Truncate = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`;
