import { gql } from '@apollo/client';

const postInfoFragment = gql`
  fragment postInfo on Post {
    _id
    slug
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
