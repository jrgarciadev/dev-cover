import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navLinks } from '@config';
import { LOADER_DELAY } from '@lib/constants';
import { useScrollDirection } from '@hooks';
import { Menu } from '@components';
import { useUserDataContext } from '@contexts/user-data';
import { StyledHeader, StyledNav, StyledLinks } from './styles';

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const [userName, setUserName] = useState('');
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const { user } = useUserDataContext();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };
  useEffect(() => {
    if (user) {
      setUserName(user?.name);
    }
  }, [user]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? LOADER_DELAY : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <div className="logo" tabIndex="-1">
                {isHome ? (
                  <a href="/" aria-label="home">
                    <h1>{userName}</h1>
                  </a>
                ) : (
                  <Link href="/" aria-label="home">
                    <h1>{userName}</h1>
                  </Link>
                )}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        <StyledLinks>
          <ol>
            <TransitionGroup component={null}>
              {isMounted &&
                navLinks &&
                navLinks.map(({ url, name }, i) => (
                  <CSSTransition key={name} classNames={fadeDownClass} timeout={timeout}>
                    <li key={url} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                      <a data-scroll href={url}>
                        {name}
                      </a>
                    </li>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </ol>
        </StyledLinks>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu />
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
