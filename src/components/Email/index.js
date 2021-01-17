import PropTypes from 'prop-types';
import { email } from '@config';
import { Side } from '@components';
import { StyledLinkWrapper } from './styles';

const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Side>
);

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;
