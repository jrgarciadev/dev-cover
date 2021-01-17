import styled from 'styled-components';

export const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title-container {
    text-align: center;
  }

  h2 {
    font-size: clamp(24px, 5vw, ${(props) => props.theme.fontSize.xxl});
    font-weight: ${(props) => props.theme.fontw.semibold};
  }

  .inline-link {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .archive-link {
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: ${(props) => props.theme.fontSize.sm};
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.bigButton};
    font-size: ${(props) => props.theme.fontSize.sm};
    margin: 80px auto 0;
  }
`;

export const StyledProject = styled.div`
  cursor: default;
  transition: ${(props) => props.theme.transitions.default};
  &:hover,
  &:focus {
    outline: 0;
    .project-inner {
      transform: translateY(-5px);
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: ${(props) => props.theme.borderRadius};
    background-color: ${(props) => props.theme.bg.defaultLight};
    transition: ${(props) => props.theme.transitions.default};
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 30px;

    .folder {
      svg {
        fill: ${(props) => props.theme.brand.primary};
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      margin-right: -10px;
      color: ${(props) => props.theme.text.accent};

      a {
        padding: 5px 10px;

        svg {
          fill: ${(props) => props.theme.text.accent};
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.xl};
  }

  .project-description {
    color: ${(props) => props.theme.text.accent};
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      color: ${(props) => props.theme.text.accent};
      font-family: ${(props) => props.theme.fontFamily.fontMono};
      font-size: ${(props) => props.theme.fontSize.xs};
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;
