import { PortfolioView } from '@views';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LoaderContainer, Loader } from '@common/styles';
import buildUser from '@lib/user-builder';
import { IS_GENERATOR } from '@lib/constants';

const username = process.env.NEXT_PUBLIC_USERNAME;
const isLivePortfolio = username && !IS_GENERATOR;

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  if (isLivePortfolio) {
    return { notFound: true };
  }
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
        {!isLivePortfolio && <h1>Doing the magic 🪄💫...</h1>}
      </LoaderContainer>
    );
  }
  return <PortfolioView user={user} />;
};

PortfolioPage.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(PortfolioPage);
