import { PortfolioView } from '@views';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { username } = params;
  try {
    // const githubUserResponse = await fetch(`https://api.github.com/users/${username}`);
    // if (githubUserResponse.status === 404 || githubUserResponse.status === 403) {
    //   return { notFound: true };
    // }
    // const githubUser = await githubUserResponse.json();
    const githubUser = {};
    const devtoUserResponse = await fetch(` https://dev.to/api/users/by_username?url=${username}`);
    const devtoUser = await devtoUserResponse.json();

    const { data: hnUserData } = await apolloClient.query({
      query: GET_USER_BY_USERNAME,
      variables: {
        username,
      },
    });
    const hashnodeUser = hnUserData.user;
    const user = {
      ...githubUser,
      ...devtoUser,
      ...hashnodeUser,
    };
    return {
      props: {
        user,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error:', error);
    return { notFound: true };
  }
}

const IndexPage = ({ router, user }) => {
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  console.log(user);
  return <PortfolioView user={user} />;
};

IndexPage.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(IndexPage);
