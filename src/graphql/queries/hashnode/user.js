import { gql } from '@apollo/client';
import userInfoFragment from '../../fragments/hashnode/user';

export const GET_USER_BY_USERNAME = gql`
  query($username: String!) {
    user(username: $username) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`;
