/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NAV_DELAY } from '@lib/constants';
import { StyledContainer, LargeLogo, HeroTitle, StyledInput } from './styles';

function HomeForm() {
  const [username, setUsername] = useState('');
  const handleChange = (e) => setUsername(e.target.value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), NAV_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  const logo = <LargeLogo alt="DevCover Logo" src="/devcover-logo.svg" />;
  const heroTitle = <HeroTitle>Just type your username and watch the magic</HeroTitle>;
  const form = (
    <form>
      <StyledInput
        placeholder="Github Username"
        name="username"
        type="text"
        onChange={handleChange}
      />
    </form>
  );

  const items = [logo, heroTitle, form];

  return (
    <StyledContainer>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={1500}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledContainer>
  );
}

export default HomeForm;
