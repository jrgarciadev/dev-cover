import { Hero, About, Featured, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';
import PropTypes from 'prop-types';
import { getLogestString } from '@utils';

const PortfolioView = ({ user }) => {
  const userBio = getLogestString([user?.summary, user?.bio, user?.tagline]);
  return (
    <StyledMainContainer className="fillHeight">
      <Hero name={user?.name} bio={userBio} />
      {/* <About />
      <Featured />
      <Projects />
      <Contact /> */}
    </StyledMainContainer>
  );
};

PortfolioView.propTypes = {
  user: PropTypes.object,
};

export default PortfolioView;
