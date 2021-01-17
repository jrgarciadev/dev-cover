import styled from 'styled-components';

export const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 10px;
    transition: ${(props) => props.theme.transitions.default};
    &:last-of-type {
      margin-bottom: 20px;
    }

    &:hover,
    &:focus {
      transform: translateY(-3px);
      svg {
        fill: ${(props) => props.theme.brand.primary};
      }
    }

    a {
      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        fill: ${(props) => props.theme.bg.reverse};
        width: 18px;
        height: 18px;
      }
    }
  }
`;
