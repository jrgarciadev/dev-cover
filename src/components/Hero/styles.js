import styled from 'styled-components';

export const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;

  h1 {
    margin: 0 0 8px 4px;
    color: ${(props) => props.theme.brand.primary};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: clamp(
      ${(props) => props.theme.fontSize.sm},
      5vw,
      ${(props) => props.theme.fontSize.md}
    );
    font-weight: 400;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      margin: 0 0 20px 2px;
    }
  }

  p {
    margin: 24px 0 50px;
    max-width: 500px;
    color: ${(props) => props.theme.text.accent};
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }
`;

export const StyledBigTitle = styled.h3`
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: ${(props) => props.theme.fontw.semibold};
  ${({ slate, theme }) =>
    slate &&
    `
    margin-top: 10px;
    color: ${theme.brand.secondary};
    line-height: 0.9;
`}
`;
