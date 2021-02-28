import styled from 'styled-components';

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ShowMoreButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
`;
