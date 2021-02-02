import PropTypes from 'prop-types';
import { Social } from '@components';
import { StyledFooter, StyledCredit } from './styles';

const Footer = ({ simple = false }) => {
  return (
    <StyledFooter>
      {simple ? (
        <StyledCredit simple={simple} tabindex="-1">
          <a rel="noreferrer" target="_blank" href="https://jrgarciadev.com">
            <span>Created by</span>
            &nbsp;
            <div>Junior García</div>
          </a>
        </StyledCredit>
      ) : (
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
      )}
    </StyledFooter>
  );
};

Footer.propTypes = {
  simple: PropTypes.bool,
};

export default Footer;
