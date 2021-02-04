import { useEffect } from 'react';
import { Hero, About, Blog, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';
import PropTypes from 'prop-types';
import { useUserDataContext } from '@contexts/user-data';
import { useUIContext } from '@contexts/ui';
import { useToasts } from '@contexts/toasts';
import { get } from 'lodash';

const PortfolioView = ({ user }) => {
  const { updateValue } = useUserDataContext();
  const { ToastsType, addToastWithTimeout } = useToasts();
  const { restartValues, updateValue: updateUI } = useUIContext();
  useEffect(() => {
    restartValues();
    updateUI({ showDeployButton: true, showCustomizer: true });
  }, []);
  useEffect(() => {
    if (user) {
      updateValue(user);
      if (get(user, 'github.limited') === true) {
        addToastWithTimeout(ToastsType.ERROR, 'Github API rate limit exceeded try again in 1 hour');
      }
    }
  }, [user]);
  return (
    <StyledMainContainer className="fillHeight">
      <Hero />
      {user?.hasReadme && <About />}
      {user?.hasPosts && <Blog />}
      {user?.hasRepos && <Projects />}
      <Contact />
    </StyledMainContainer>
  );
};

PortfolioView.propTypes = {
  user: PropTypes.object,
};

export default PortfolioView;
