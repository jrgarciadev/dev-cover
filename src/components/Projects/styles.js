import styled from 'styled-components';
import { hexa } from '@utils';

export const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .inline-link {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .more-button {
    ${({ theme }) => theme.mixins.bigButton};
    font-size: ${(props) => props.theme.fontSize.sm};
    margin: 80px auto 0;
  }
`;

export const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StyledProject = styled.div`
  margin-bottom: 2%;
  cursor: default;
  min-height: 270px;
  transition: ${(props) => props.theme.transitions.default};
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-bottom: 5%;
  }
  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    border: 2px solid ${(props) => hexa(props.theme.brand.primary, 0.5)};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: ${(props) => props.theme.borderRadius};
    transition: ${(props) => props.theme.transitions.default};
    &:hover {
      border-color: ${(props) => props.theme.brand.primary};
    }
    header,
    footer {
      width: 100%;
    }
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        &:hover {
          svg {
            fill: ${(props) => props.theme.brand.primary};
          }
        }
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
    word-wrap: anywhere;
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.xl};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.brand.primary};
    }
  }

  .project-description {
    min-width: 100%;
    color: ${(props) => props.theme.text.accent};
    font-size: ${(props) => props.theme.fontSize.md};
  }

  .project-tech-name {
    color: ${(props) => props.theme.text.accent};
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: ${(props) => props.theme.fontSize.xs};
    line-height: 1.75;
  }

  .metrics {
    ${({ theme }) => theme.mixins.flexCenter};
    .project-metric-value {
      margin-right: 1rem;
    }
  }

  .project-metric-value {
    display: flex;
    align-items: center;
    font-family: ${(props) => props.theme.fontFamily.fontMono};
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: 1.75;
    &:hover {
      svg {
        path {
          stroke: ${(props) => props.theme.brand.primary};
        }
      }
      .filled {
        path {
          fill: ${(props) => props.theme.brand.primary};
        }
      }
    }
    svg {
      width: 20px;
    }
    .filled {
      path {
        fill: ${(props) => props.theme.text.default};
      }
    }
  }
`;
