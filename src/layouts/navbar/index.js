import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LOADER_DELAY } from '@lib/constants';
import { useScrollDirection } from '@hooks';
import { Menu } from '@components';
import { toLowerCase } from '@utils';
import { getNavLinks, getKeysMapped, getHeroLink, getObjValue } from '@utils/user-mapping';
import { useUserDataContext } from '@contexts/user-data';
import { Show } from 'react-iconly';
import { get, capitalize, startsWith } from 'lodash';
import { useUIContext } from '@contexts/ui';
import { StyledHeader, StyledNav, StyledLinks } from './styles';

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const [userName, setUserName] = useState('');
  const [navLinks, setNavLinks] = useState([]);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const { user } = useUserDataContext();
  const { isEditable } = useUIContext();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setNavLinks(getKeysMapped(getNavLinks(user)));
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

  const getPreviewURL = () => {
    const username = get(user, 'username');
    if (!username) return '#';
    const formattedUsername = toLowerCase(username);
    return `/preview/${formattedUsername}`;
  };

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <div className="logo" tabIndex="-1">
                <a className="nav-title" data-scroll href={getHeroLink(user)} aria-label="home">
                  {userName}
                </a>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        <StyledLinks>
          <ol>
            <TransitionGroup component={null}>
              {isMounted &&
                navLinks &&
                navLinks.map((link, i) => (
                  <CSSTransition key={link.key} classNames={fadeDownClass} timeout={timeout}>
                    <li key={link.key} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                      <a data-scroll target={startsWith('h') && '_blank'} href={getObjValue(link)}>
                        {capitalize(link.key)}
                      </a>
                    </li>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </ol>
          {isEditable && (
            <TransitionGroup component={null}>
              {isMounted && navLinks.length > 0 && (
                <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                  <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                    <a
                      href={getPreviewURL()}
                      target="_blank"
                      rel="noreferrer"
                      className="preview-button"
                    >
                      <Show />
                      Preview
                    </a>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
          )}
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
