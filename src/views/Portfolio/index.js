import { Hero, About, Featured, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';
import PropTypes from 'prop-types';
import { getLogestString } from '@utils';

const PortfolioView = ({ user }) => {
  return (
    <StyledMainContainer className="fillHeight">
      <Hero name={user.name} bio={getLogestString([user.summary, user.bio, user.tagline])} />
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
