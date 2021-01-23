import { gql } from '@apollo/client';

const socialMediaInfoFragment = gql`
  fragment socialMediaInfo on SocialMedia {
    twitter
    github
    twitter
    linkedin
    google
    website
    facebook
  }
`;

export default socialMediaInfoFragment;
