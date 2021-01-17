import styled from 'styled-components';

export const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: ${(props) => props.theme.fontFamily.mono};
    font-size: ${(props) => props.theme.fontSize.xs};
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    transition: ${(props) => props.theme.transitions.default};
    &:hover,
    &:focus {
      color: ${(props) => props.theme.brand.primary};
      transform: translateY(-3px);
    }
  }
`;
