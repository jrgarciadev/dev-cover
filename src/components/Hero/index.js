/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { email } from '@config';
import { NAV_DELAY, LOADER_DELAY } from '@lib/constants';
import PropTypes from 'prop-types';
import { StyledHeroSection, StyledBigTitle } from './styles';

const Hero = ({ name = '', bio = '' }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), NAV_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  const welcome = <h1>Welcome, I&apos;m</h1>;
  const nameTitle = <StyledBigTitle>{name}</StyledBigTitle>;
  const bioDescription = <p>{bio}</p>;
  const mailButton = (
    <a href={`mailto:${email}`} className="email-link">
      Get In Touch
    </a>
  );

  const items = [welcome, nameTitle, bioDescription, mailButton];

  return (
    <StyledHeroSection>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={LOADER_DELAY}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};
Hero.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
};
export default Hero;
