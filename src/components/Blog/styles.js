import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ShowMoreButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
`;
