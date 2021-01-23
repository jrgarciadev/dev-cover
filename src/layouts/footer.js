import { Icon } from '@components/Icons';
import { socialMedia } from '@config';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { StyledFooter, StyledSocialLinks, StyledMadeWith, StyledCredit } from './styles';

const Footer = ({ type = 'single' }) => {
  return (
    <StyledFooter type={type}>
      {type === 'single' ? (
        <StyledCredit tabindex="-1">
          <a rel="noreferrer" target="_blank" href="https://jrgarciadev.com">
            <span>Creted by</span>
            &nbsp;
            <div>Junior García</div>
          </a>
        </StyledCredit>
      ) : (
        <>
          <StyledSocialLinks>
            <ul>
              {socialMedia &&
                socialMedia.map(({ name, url }) => (
                  <li key={name}>
                    <a href={url} aria-label={name}>
                      <Icon name={name} />
                    </a>
                  </li>
                ))}
            </ul>
          </StyledSocialLinks>

          <StyledMadeWith>
            <p>Made with</p>
            <a rel="noreferrer" target="_blank" href="https://nextjs.org/">
              <Image src="/nextjs-white-logo.svg" width={100} height={100} />
            </a>
          </StyledMadeWith>
        </>
      )}
    </StyledFooter>
  );
};

Footer.propTypes = {
  type: PropTypes.oneOf(['single', 'complete']),
};

export default Footer;
