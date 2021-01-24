import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { withRouter } from 'next/router';
import { SkipToContentLink } from './styles';
import Main from './main';
import BaseLayout from './base';
import Navbar from './navbar';
import Footer from './footer';

const PorfolioLayout = ({ children, router }) => {
  const isBrowser = typeof window !== `undefined`;
  const isHome = router.pathname === '/';
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');

    if (window.location.hash) {
      const id = window.location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, []);

  return (
    <BaseLayout>
      <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>
      <Navbar isHome={isHome} />
      <Main id="content" className="fillHeight">
        {children}
      </Main>
      <Footer />
    </BaseLayout>
  );
};

PorfolioLayout.propTypes = {
  router: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default withRouter(PorfolioLayout);
