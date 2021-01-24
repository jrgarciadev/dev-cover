import { gql } from '@apollo/client';
import socialMediaInfoFragment from './socialMedia';
import postInfoFragment from './post';

const userInfoFragment = gql`
  fragment userInfo on User {
    name
    username
    socialMedia {
      ...socialMediaInfo
    }
    publication {
      posts {
        ...postInfo
      }
    }
    blogHandle
    tagline
    isEvangelist
    dateJoined
    numFollowing
    numFollowers
    location
    photo
    coverImage
    numPosts
    publicationDomain
  }
  ${socialMediaInfoFragment}
  ${postInfoFragment}
`;

export default userInfoFragment;
