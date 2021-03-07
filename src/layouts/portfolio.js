import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Toasts } from '@components';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { IS_GENERATOR } from '@lib/constants';
import { useUIContext } from '@contexts/ui';
import { useUserDataContext } from '@contexts/user-data';
import { isEmpty } from 'lodash';
import { SkipToContentLink } from './styles';
import Main from './main';
import BaseLayout from './base';
import Navbar from './navbar';
import Footer from './footer';

const Customizer = dynamic(() => import('@components/Customizer'));
const VercelButton = dynamic(() => import('@components/VercelButton'));
const CoffeeButton = dynamic(() => import('@components/CoffeeButton'));

const PorfolioLayout = ({ children, router }) => {
  const isBrowser = typeof window !== `undefined`;
  const isHome = router.pathname === '/';
  const { showNavbar, showDeployButton, mainFullHeight, showCustomizer } = useUIContext();
  const { user } = useUserDataContext();

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
    <BaseLayout isPortfolio>
      <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>
      {showNavbar && <Navbar isHome={isHome} />}
      <Main id="content" fullHeight={mainFullHeight} className="fillHeight">
        {children}
      </Main>
      {IS_GENERATOR && showDeployButton && <VercelButton />}
      {IS_GENERATOR && showCustomizer && <Customizer />}
      {IS_GENERATOR && <Toasts />}
      {IS_GENERATOR && <CoffeeButton />}
      <Footer simple={isEmpty(user.username)} user={user} />
    </BaseLayout>
  );
};

PorfolioLayout.propTypes = {
  router: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default withRouter(PorfolioLayout);
