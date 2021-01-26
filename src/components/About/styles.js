import styled from 'styled-components';
import { tint } from '@utils';

export const StyledAboutSection = styled.section`
  max-width: 100%;
`;

export const StyledMarkdown = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  text-align: left;
  img {
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  p {
    text-align: left;
  }

  h1,
  h2,
  h3 {
    font-size: ${(props) => props.theme.fontSize.xl};
    margin: 2rem 0;
  }
  p {
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.lg};
    margin: 0.5rem 0;
    a {
      font-size: ${(props) => props.theme.fontSize.lg};
    }
  }
  a {
    color: ${(props) => tint(props.theme.text.accent, 20)};
    font-size: ${(props) => props.theme.fontSize.md};
    transition: ${(props) => props.theme.transitions.default};
    &:hover {
      color: ${(props) => props.theme.brand.primary};
    }
  }

  ul,
  ol {
    display: grid;
    grid-template-columns: repeat(5, minmax(140px, 200px));
    padding: 0;
    margin: 2rem 0;
    overflow: hidden;
    list-style: none;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      grid-template-columns: repeat(2, minmax(140px, 200px));
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: ${(props) => props.theme.fontFamily.fontMono};
      font-size: ${(props) => props.theme.fontSize.sm};
      color: ${(props) => props.theme.text.accent};
      img {
        display: flex;
        margin: 10px 0;
      }
      &:before {
        content: '▹';
        position: absolute;
        top: 5px;
        left: 0;
        color: ${(props) => props.theme.brand.primary};
        font-size: ${(props) => props.theme.fontSize.sm};
        line-height: 12px;
      }
    }
  }
`;
