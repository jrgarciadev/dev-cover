import { UserNotFoundView, PortfolioView } from '@views';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LoaderContainer, Loader } from '@common/styles';
import buildUser from '@lib/user-builder';
import { isEnabledUser } from '@utils/user-mapping';
import { IS_PORTFOLIO } from '@lib/constants';
import { useChangeRootColor } from '@hooks';

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  if (IS_PORTFOLIO) {
    return { notFound: true };
  }
  try {
    const user = await buildUser({ ...params, isPreview: true });
    return {
      props: {
        user,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error('Error:', error);
    return { notFound: true };
  }
}

const PreviewPage = ({ router, user }) => {
  if (router.isFallback) {
    return (
      <LoaderContainer height="90vh">
        <Loader mb="1rem" />
        <h1>Loading preview mode 🪄💫 ...</h1>
      </LoaderContainer>
    );
  }
  if (!router.isFallback && !isEnabledUser(user)) {
    return <UserNotFoundView username={user?.username} />;
  }
  useChangeRootColor(user.primaryColor);
  return <PortfolioView isPreview user={user} />;
};

PreviewPage.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(PreviewPage);
