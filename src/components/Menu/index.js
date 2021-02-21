/* eslint-disable prefer-destructuring */
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNavLinks, getKeysMapped, getObjValue } from '@utils/user-mapping';
import { KEY_CODES } from '@lib/constants';
import { useOnClickOutside } from '@hooks';
import { useUserDataContext } from '@contexts/user-data';
import { capitalize } from 'lodash';
import { StyledMenu, StyledHamburgerButton, StyledSidebar } from './styles';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user } = useUserDataContext();
  const router = useRouter();

  const buttonRef = useRef(null);
  const navRef = useRef(null);

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = (e) => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = (e) => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false);
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = (e) => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    setFocusables();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.className = menuOpen && 'blur';
  }, [menuOpen]);

  useEffect(() => {
    if (user) {
      setNavLinks(getKeysMapped(getNavLinks(user)));
    }
  }, [user]);

  const wrapperRef = useRef();

  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  const onClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <StyledMenu>
      <div ref={wrapperRef}>
        <StyledHamburgerButton
          visible={navLinks.length > 0}
          onClick={toggleMenu}
          menuOpen={menuOpen}
          ref={buttonRef}
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <a onClick={(e) => onClick(e, getObjValue(link))}>{capitalize(link.key)}</a>
                  </li>
                ))}
              </ol>
            )}
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
