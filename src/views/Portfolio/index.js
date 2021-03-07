import { useEffect } from 'react';
import { Hero, About, Blog, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';
import PropTypes from 'prop-types';
import { useUserDataContext } from '@contexts/user-data';
import { useUIContext } from '@contexts/ui';
import { IS_PORTFOLIO, IS_GENERATOR } from '@lib/constants';
import { useToasts } from '@contexts/toasts';
import { get } from 'lodash';

const PortfolioView = ({ user, isPreview = false }) => {
  const { user: userContext, updateValue } = useUserDataContext();
  const { ToastsType, addToastWithTimeout } = useToasts();
  const { restartValues, updateValue: updateUI } = useUIContext();
  const isEditable = !(IS_PORTFOLIO || isPreview);
  const userData = !isEditable ? user : userContext;

  useEffect(() => {
    restartValues();
    updateUI({ isEditable, showDeployButton: IS_GENERATOR, showCustomizer: isEditable });
  }, [isEditable]);

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
      {userData && <Hero user={userData} />}
      {userData?.hasReadme && <About user={userData} />}
      {userData?.hasPosts && <Blog user={userData} />}
      {userData?.hasRepos && <Projects user={userData} />}
      {(userData.email || userData.isHireable) && <Contact user={userData} />}
    </StyledMainContainer>
  );
};

PortfolioView.propTypes = {
  user: PropTypes.object,
  isPreview: PropTypes.bool,
};

export default PortfolioView;
