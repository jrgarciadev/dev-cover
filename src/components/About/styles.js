import styled from 'styled-components';

export const StyledAboutSection = styled.section`
  max-width: 100%;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      display: block;
    }
  }
`;

export const StyledMarkdown = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  h1,
  h2,
  h3 {
    font-size: ${(props) => props.theme.fontSize.xl};
    margin-bottom: 1rem;
  }
  p {
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.lg};
    margin-bottom: 1rem;
  }
`;
