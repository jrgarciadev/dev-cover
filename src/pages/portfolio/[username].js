import { useEffect } from 'react';
import { PortfolioView } from '@views';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LoaderContainer, Loader } from '@common/styles';
import { useUserDataContext } from '@contexts/user-data';
import buildUser from '@lib/user-builder';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const user = await buildUser(params);
    return {
      props: {
        user,
      },
      revalidate: 3600,
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
        <h1>Doing the magic 🪄💫...</h1>
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
