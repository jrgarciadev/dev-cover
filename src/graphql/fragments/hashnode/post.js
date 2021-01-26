import { gql } from '@apollo/client';

const postInfoFragment = gql`
  fragment postInfo on Post {
    title
    type
    popularity
    totalReactions
    dateAdded
    coverImage
    replyCount
    responseCount
    brief
    dateFeatured
    replyCount
    responseCount
  }
`;

export default postInfoFragment;
