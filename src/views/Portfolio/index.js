import { useEffect } from 'react';
import { Hero, About, Featured, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';
import PropTypes from 'prop-types';
import { getStringByCriteria } from '@utils';
import { getNameUser } from '@utils/user-mapping';
import { useUserDataContext } from '@contexts/user-data';

const PortfolioView = ({ user }) => {
  const userBio = getStringByCriteria([
    user?.devto?.summary,
    user?.github?.bio,
    user?.hashnode?.tagline,
  ]);
  const { updateValue } = useUserDataContext();
  useEffect(() => {
    if (user) {
      updateValue(user);
    }
  }, [user]);
  return (
    <StyledMainContainer className="fillHeight">
      <Hero name={getNameUser(user)} bio={userBio} />
      {user?.hasReadme && <About />}
      {/*
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
