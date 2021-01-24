import styled from 'styled-components';

export const StyledSocialList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 10px;
    transition: ${(props) => props.theme.transitions.default};
    &:hover {
      transform: translateY(-3px);
      svg {
        fill: ${(props) => props.theme.brand.primary};
      }
    }
    a {
      svg {
        fill: ${(props) => props.theme.bg.reverse};
        width: 18px;
        height: 18px;
      }
    }
  }
`;
