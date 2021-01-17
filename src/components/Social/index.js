import PropTypes from 'prop-types';
import { socialMedia } from '@config';
import { Side } from '@components';
import { Icon } from '@components/Icons';
import { StyledSocialList } from './styles';

const Social = ({ isHome }) => (
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia &&
        socialMedia.map(({ url, name }) => (
          <li key={name}>
            <a rel="noreferrer" target="_blank" href={url} aria-label={name}>
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
