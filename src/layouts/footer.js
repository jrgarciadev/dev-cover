import PropTypes from 'prop-types';
import { Social } from '@components';
import { MAIN_SITE_URL, IS_PORTFOLIO } from '@lib/constants';
import { isEmpty } from 'lodash';
import { StyledFooter, StyledCredit } from './styles';

const Footer = ({ simple = false, user = {} }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const renderFooter = () => {
    if (!isEmpty(user)) {
      return (
        <StyledCredit simple={simple} tabindex="-1">
          <span className="copyright">
            <span>
              ©&nbsp;
              {year}
              &nbsp;
              {user.name || user.username}
            </span>
          </span>
          <StyledCredit simple tabindex="-1">
            <a rel="noreferrer" target="_blank" href={MAIN_SITE_URL}>
              <span>Powered by Devcover</span>
            </a>
          </StyledCredit>
        </StyledCredit>
      );
    }
    if (IS_PORTFOLIO) {
      return (
        <StyledCredit simple tabindex="-1">
          <a rel="noreferrer" target="_blank" href={MAIN_SITE_URL}>
            <span>Powered by Devcover</span>
          </a>
        </StyledCredit>
      );
    }
    if (simple) {
      return (
        <StyledCredit simple tabindex="-1">
          <a rel="noreferrer" target="_blank" href="https://jrgarciadev.com">
            <span>Created by</span>
            &nbsp;
            <div>Junior García</div>
          </a>
        </StyledCredit>
      );
    }
    return (
      <>
        <Social className="social-networks" />
        <StyledCredit simple={simple} small tabindex="-1">
          <a rel="noreferrer" target="_blank" href="https://vercel.com">
            <span>Hosted by</span>
            &nbsp;
            <img src="/vercel.svg" alt="vercel logo" />
          </a>
        </StyledCredit>
      </>
    );
  };

  return <StyledFooter>{renderFooter()}</StyledFooter>;
};

Footer.propTypes = {
  simple: PropTypes.bool,
  user: PropTypes.object,
};

export default Footer;
