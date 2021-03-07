import styled from 'styled-components';
import { hexa } from '@utils';
import { prop } from 'styled-tools';

export const StyledRepo = styled.div`
  margin-bottom: 2%;
  cursor: default;
  position: relative;
  transition: ${(props) => props.theme.transitions.default};
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-bottom: 5%;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    border: 2px solid ${(props) => hexa(props.theme.brand.primary, 0.5, true)};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: ${(props) => props.theme.borderRadius};
    transition: all 0.25s ease;
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
    margin-bottom: 10px;
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
    margin: 1rem 0;
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
    margin-bottom: 1rem;
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
