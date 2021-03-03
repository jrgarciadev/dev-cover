import styled from 'styled-components';
import { prop } from 'styled-tools';

export const ActionContainer = styled.div`
  position: absolute;
  top: -1.5rem;
  left: -0.5rem;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 0.6rem;
  align-items: center;
  border-radius: 1.375rem;
  background: ${prop('theme.bg.defaultLight')};
  .icon {
    margin: 0 0.5rem;
    cursor: pointer;
  }
  .chevron-icon,
  .edit-icon {
    &:hover,
    &:focus {
      path {
        fill: ${prop('theme.brand.primary')};
      }
    }
  }
  .delete-icon {
    &:hover,
    &:focus {
      path {
        fill: ${prop('theme.brand.danger')};
      }
    }
  }
`;
