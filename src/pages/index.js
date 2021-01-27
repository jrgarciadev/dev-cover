import { HomeFormView, UserNotFoundView, PortfolioView } from '@views';
import { StyledMainContainer } from '@common/styles';
import PortfolioLayout from '@layouts/portfolio';
import HomeLayout from '@layouts/home';
import buildUser from '@lib/user-builder';
import { isEnabledUser } from '@utils/user-mapping';
import { IS_GENERATOR } from '@lib/constants';
import PropTypes from 'prop-types';

const username = process.env.NEXT_PUBLIC_USERNAME;
const isLivePortfolio = username && !IS_GENERATOR;

export async function getStaticProps() {
  if (isLivePortfolio) {
    const params = { username };
    const user = await buildUser(params);
    return {
      props: {
        user,
      },
    };
  }
  return {
    props: {
      user: null,
    },
  };
}

const IndexPage = ({ user }) => {
  if (user) {
    if (!isEnabledUser(user)) {
      return <UserNotFoundView username={user?.username} />;
    }
    return <PortfolioView user={user} />;
  }
  return (
    <StyledMainContainer className="fillHeight">
      <HomeFormView />
    </StyledMainContainer>
  );
};

IndexPage.Layout = isLivePortfolio ? PortfolioLayout : HomeLayout;

IndexPage.propTypes = {
  user: PropTypes.object,
};
export default IndexPage;
