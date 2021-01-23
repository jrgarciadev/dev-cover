import styled from 'styled-components';

export const CornerStyles = styled.div`
  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    &:hover .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
    svg {
      fill: ${(props) => props.theme.bg.reverse};
      color: ${(props) => props.theme.bg.default};
      .octo-arm {
        transform-origin: 130px 106px;
      }
    }
  }
  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    .github-corner {
      &:hover .octo-arm {
        animation: none;
      }
      .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
    }
  }
`;
