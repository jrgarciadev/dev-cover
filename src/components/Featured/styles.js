import styled from 'styled-components';

export const StyledProjectImgWrapper = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;

  .img-wrapper {
    position: relative;
    overflow: hidden;
    .img-cont {
      width: 100%;
      padding-bottom: 62.2857%;
    }
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-column: 1 / -1;
    height: 100%;
    opacity: 0.25;
  }

  a {
    display: block;
    width: 100%;
    background-color: ${(props) => props.theme.brand.primary};
    border-radius: ${(props) => props.theme.borderRadius};
    vertical-align: middle;

    &:hover,
    &:focus {
      background: transparent;

      &:before,
      .img {
        background: transparent;
        filter: none;
      }
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      border-radius: ${(props) => props.theme.borderRadius};
      transition: ${(props) => props.theme.transitions.default};
      background-color: ${(props) => props.theme.bg.default};
      mix-blend-mode: screen;
    }
  }
`;

export const StyledProjectLinks = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${({ theme }) => theme.text.accent};
  a {
    padding: 10px;
    svg {
      fill: ${({ theme }) => theme.text.accent};
      width: 20px;
      height: 20px;
    }
  }
`;

export const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      margin-bottom: 70px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-column: 5 / -1;
      }

      @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      }

      @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      li {
        margin: 0 0 5px 20px;

        @media (max-width: ${(props) => props.theme.breakpoints.md}) {
          margin: 0 0 5px 10px;
        }
      }
    }
    ${StyledProjectLinks} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    ${StyledProjectImgWrapper} {
      grid-column: 1 / 8;
      @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-column: 1 / -1;
      }
    }
  }
  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
      grid-column: 1 / 9;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: ${(props) => props.theme.brand.primary};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontw.regular};
  }

  .project-title {
    color: ${({ theme }) => theme.text.default};
    font-size: clamp(24px, 5vw, 28px);

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      margin: 0 0 20px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      color: ${({ theme }) => theme.text.default};
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.bg.defaultLight};
    color: ${({ theme }) => theme.text.accent};
    font-size: ${({ theme }) => theme.fontSize.md};

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: ${({ theme }) => theme.text.accent};
      font-family: ${({ theme }) => theme.fontFamily.fontMono};
      font-size: ${({ theme }) => theme.fontSize.sm};
      white-space: nowrap;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: ${({ theme }) => theme.text.accent};
      }
    }
  }
`;

export const StyledProjectImage = styled.img`
  object-fit: cover;
  object-position: center center;
  max-width: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    object-fit: cover;
    width: auto;
    height: 100%;
    filter: grayscale(100%) contrast(1) brightness(80%);
  }
`;
