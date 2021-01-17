/* eslint-disable global-require */
import { useEffect, useRef } from 'react';
import { Icon } from '@components/Icons';
import { socialMedia } from '@config';
import { srConfig } from '@config/sr';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { StyledFooter, StyledSocialLinks, StyledMadeWith, StyledCredit } from './styles';

const Footer = ({ type = 'single' }) => {
  const revealContainer = useRef(null);
  useEffect(() => {
    const ScrollReveal = require('scrollreveal');
    const sr = ScrollReveal.default();
    sr.reveal(revealContainer.current, srConfig(1500));
  }, []);

  return (
    <StyledFooter type={type} ref={revealContainer}>
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
