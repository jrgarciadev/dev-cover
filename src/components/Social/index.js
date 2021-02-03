import { Icon } from '@components/Icons';
import PropTypes from 'prop-types';
import { useUserDataContext } from '@contexts/user-data';
import * as gtag from '@lib/gtag';
import { IS_PRODUCTION } from '@lib/constants';
import { extractSocialNetworks, getKeysMapped, getObjValue } from '@utils/user-mapping';
import { StyledSocialList } from './styles';

const Social = ({ className = '' }) => {
  const { user } = useUserDataContext();
  const socialMedia = extractSocialNetworks(user);
  const userLinks = socialMedia ? getKeysMapped(socialMedia) : [];
  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('social_link_click', 'links', 'user clicked on a social link button', link);
    }
    window.open(link, '_blank');
  };
  return (
    <StyledSocialList className={className}>
      {userLinks &&
        userLinks.map((link) => (
          <li key={link.key}>
            <a onClick={() => handleClickLink(getObjValue(link))}>
              <Icon name={link.key} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  );
};
Social.propTypes = {
  className: PropTypes.string,
};
export default Social;
