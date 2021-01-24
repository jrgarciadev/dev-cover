import { Icon } from '@components/Icons';
import PropTypes from 'prop-types';
import { useUserDataContext } from '@contexts/user-data';
import { getLiksMapped, getSocialURL } from '@utils/user-mapping';
import { StyledSocialList } from './styles';

const Social = ({ className = '' }) => {
  const { user } = useUserDataContext();
  const userLinks = user ? getLiksMapped(user) : [];
  console.log({ userLinks });
  return (
    <StyledSocialList className={className}>
      {userLinks &&
        userLinks.map((link) => (
          <li key={link.key}>
            <a rel="noreferrer" target="_blank" href={getSocialURL(link)}>
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
