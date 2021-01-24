import { useEffect } from 'react';
import { PortfolioView } from '@views';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';
import { LoaderContainer, Loader } from '@common/styles';
import { useUserDataContext } from '@contexts/user-data';
import { cleanAttrs } from '@utils';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { username } = params;
  try {
    const githubUserResponse = await fetch(`https://api.github.com/users/${username}`);
    if (githubUserResponse.status === 404 || githubUserResponse.status === 403) {
      return { notFound: true };
    }
    const githubUserRes = await githubUserResponse.json();
    const devtoUserResponse = await fetch(` https://dev.to/api/users/by_username?url=${username}`);
    const devtoUserRes = await devtoUserResponse.json();
    const { data: hnUserData } = await apolloClient.query({
      query: GET_USER_BY_USERNAME,
      variables: {
        username,
      },
    });
    const githubUser = cleanAttrs(githubUserRes);
    const hashnodeUser = cleanAttrs(hnUserData.user);
    const devtoUser = cleanAttrs(devtoUserRes);
    const user = {
      ...githubUser,
      ...devtoUser,
      ...hashnodeUser,
      hasDevto: devtoUser.status !== 404,
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

const PortfolioPage = ({ router, user }) => {
  if (router.isFallback) {
    return (
      <LoaderContainer height="100vh">
        <Loader mb="1rem" />
        <h1>Generating porfolio...</h1>
      </LoaderContainer>
    );
  }
  const { updateValue } = useUserDataContext();
  useEffect(() => {
    if (user) {
      updateValue(user);
    }
  }, [user]);
  return <PortfolioView user={user} />;
};

PortfolioPage.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(PortfolioPage);
