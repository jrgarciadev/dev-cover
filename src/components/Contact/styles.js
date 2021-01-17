import styled from 'styled-components';

export const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px !important;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin: 0 auto 50px;
  }
  .title {
    font-size: clamp(40px, 5vw, ${(props) => props.theme.fontSize.xxl});
    font-weight: ${(props) => props.theme.fontw.semibold};
  }
  p {
    color: ${(props) => props.theme.text.accent};
  }
  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    font-size: ${(props) => props.theme.fontSize.sm};
    margin-top: 50px;
  }
`;
