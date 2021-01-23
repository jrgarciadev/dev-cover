/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withTheme } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { HERO_TITLE_DELAY } from '@lib/constants';
import { ArrowRight } from 'react-iconly';
import PropTypes from 'prop-types';
import { Corner } from '@components';
import {
  StyledContainer,
  StyledForm,
  LargeLogo,
  HeroTitle,
  StyledInput,
  StyledButton,
} from './styles';

function HomeForm({ theme }) {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleChange = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || username.length < 2) {
      return;
    }
    router.push('/portfolio/[username]', `/portfolio/${username}`);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), HERO_TITLE_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  const logo = <LargeLogo alt="DevCover Logo" src="/devcover-logo.svg" />;
  const heroTitle = <HeroTitle>Just type your username and watch the magic</HeroTitle>;
  const form = (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        placeholder="Github Username"
        name="username"
        type="text"
        onChange={handleChange}
      />
      <StyledButton type="submit">
        <ArrowRight set="light" primaryColor={theme.bg.default} />
      </StyledButton>
    </StyledForm>
  );

  const items = [logo, heroTitle, form];

  return (
    <StyledContainer>
      <Corner />
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={1000}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledContainer>
  );
}

HomeForm.propTypes = {
  theme: PropTypes.object,
};
export default withTheme(HomeForm);
