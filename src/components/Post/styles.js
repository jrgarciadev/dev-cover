import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';

export const StyledContainer = styled.div`
  display: grid;
  margin: 2rem 0;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${prop('theme.breakpoints.md')}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${prop('theme.breakpoints.sm')}) {
    margin: 2.5rem 0;
  }
  order: ${prop('order', 0)};
`;

export const LeftContainer = styled.div`
  ${prop('theme.mixins.flexCenter')};
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 2rem;
  @media (max-width: ${prop('theme.breakpoints.md')}) {
    order: 2;
  }
  ${ifProp(
    'isGenerator',
    css`
      padding-top: 2.5rem;
      margin-top: 2.5rem;
    `,
  )}
  .featured {
    display: flex;
    color: ${(props) => props.theme.brand.primary};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: ${(props) => props.theme.fontSize.xs};
    margin: 1rem 0;
    svg {
      margin-right: 1rem;
    }
  }
  .date {
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.sm};
  }
  .title {
    cursor: pointer;
    color: ${(props) => props.theme.text.default};
    font-size: ${(props) => props.theme.fontSize.xxl};
    font-weight: ${(props) => props.theme.fontw.semibold};
  }
  .description {
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  .insights {
    display: flex;
    margin: 2rem 0;
  }
  .likes,
  .comments {
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    display: flex;
    p {
      margin: 0 1rem;
    }
  }
  .comments {
    margin-left: 1.5rem;
  }
`;

export const RightContainer = styled.div`
  ${prop('theme.mixins.flexCenter')};
  flex-direction: column;
  @media (max-width: ${prop('theme.breakpoints.md')}) {
    order: 1;
    margin-bottom: 2rem;
  }
`;

export const ImageContainer = styled.a`
  background: ${(props) => props.theme.bg.default};
  border-radius: ${(props) => props.theme.borderRadius};
  position: relative;
  z-index: 10;
  width: 100%;
  &:after {
    display: block;
    content: '';
    padding-bottom: 65%;
  }
  > img {
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;
