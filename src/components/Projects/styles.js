/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';

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
  .show-original {
    ${({ theme }) => theme.mixins.bigButton};
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 4rem;
    svg {
      margin-right: 1rem;
    }
  }
`;

export const StyledGrid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
  ${ifProp(
    'isDraggingOver',
    css`
      outline: 2px dashed ${prop('theme.brand.primary')};
      outline-offset: 20px;
    `,
  )}
`;
