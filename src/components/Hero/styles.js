import styled from 'styled-components';

export const StyledHeroSection = styled.section`
  display: grid;
  min-height: 100vh;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const StyledBigTitle = styled.h3`
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: ${(props) => props.theme.fontw.semibold};
`;

export const LeftContainer = styled.div`
  ${(props) => props.theme.mixins.flexCenter}
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    order: 2;
  }

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
    font-size: ${(props) => props.theme.fontSize.lg};
    color: ${(props) => props.theme.text.accent};
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }
`;

export const RightContainer = styled.div`
  ${(props) => props.theme.mixins.flexCenter}
  flex-direction: column;
  .social-networks {
    margin-top: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    order: 1;
    .social-networks {
      margin-top: 20px;
    }
  }
`;

export const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    .img {
      object-fit: cover;
      max-width: 100%;
      position: relative;
      border-radius: 50%;
    }

    &:after {
      content: '';
      top: -8%;
      left: -8%;
      z-index: 1;
      display: block;
      position: absolute;
      width: 116%;
      height: 116%;
      border-radius: 50%;
      border: 3px solid ${(props) => props.theme.brand.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    .wrapper {
      width: 164px;
      height: 164px;
      margin-top: 20px;
      .img {
        width: 164px;
        height: 164px;
      }
    }
  }
`;
