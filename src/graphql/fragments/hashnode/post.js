import { gql } from '@apollo/client';

const postInfoFragment = gql`
  fragment postInfo on Post {
    title
  }
`;

export default postInfoFragment;
