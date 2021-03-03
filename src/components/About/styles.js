import styled, { css } from 'styled-components';
import { tint } from '@utils';
import { ifProp, prop } from 'styled-tools';

export const StyledAboutSection = styled.section`
  max-width: 100%;
`;

export const Container = styled.div`
  position: relative;
`;

export const EditContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const EditActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin: 2rem 0;
  button {
    margin-left: 2rem;
    ${prop('theme.mixins.bigButton')};
  }
  .cancel-button {
    border-width: 0px;
    color: ${prop('theme.text.default')};
  }
`;

export const StyledMarkdown = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  text-align: left;
  ${ifProp(
    'isGenerator',
    css`
      padding-top: 3rem;
    `,
  )}
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
    grid-template-columns: 1fr;
    padding: 0;
    margin: 2rem 0;
    overflow: hidden;
    list-style: none;

    li {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      margin-bottom: 2.5rem;
      padding-left: 20px;
      font-family: ${(props) => props.theme.fontFamily.fontMono};
      font-size: ${(props) => props.theme.fontSize.md};
      color: ${(props) => props.theme.text.accent};
      * {
        font-size: ${(props) => props.theme.fontSize.md};
      }
      img {
        display: flex;
        margin: 0.5rem;
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
