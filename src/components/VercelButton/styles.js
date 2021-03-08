import styled from 'styled-components';

export const ButtonContainer = styled.div`
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: fixed;
  bottom: 2rem;
  right: 1rem;
`;

export const StyledButton = styled.a`
  display: flex;
  align-items: center;
  padding: 1.5rem 2.4rem;
  background: #0070f3;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: ${(props) => props.theme.transitions.default};
  img {
    margin-right: 1rem;
  }
  span {
    display: flex;
    color: white;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  &:hover {
    transform: translateY(-10px);
  }
`;
