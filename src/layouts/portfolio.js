import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { withRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import theme from '@themes/dark';
import { VercelButton, Customizer } from '@components';
import { IS_GENERATOR } from '@lib/constants';
import { useUIContext } from '@contexts/ui';
import { useCustomizerContext } from '@contexts/customizer';
import { SkipToContentLink } from './styles';
import Main from './main';
import BaseLayout from './base';
import Navbar from './navbar';
import Footer from './footer';

const PorfolioLayout = ({ children, router }) => {
  const isBrowser = typeof window !== `undefined`;
  const isHome = router.pathname === '/';
  const { showNavbar, showDeployButton, mainFullHeight, showCustomizer } = useUIContext();
  const { primaryColor } = useCustomizerContext();
  const customTheme = { ...theme, brand: { ...theme.brand, primary: primaryColor } };

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
    <ThemeProvider theme={customTheme}>
      <BaseLayout isPortfolio>
        <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>
        {showNavbar && <Navbar isHome={isHome} />}
        <Main id="content" fullHeight={mainFullHeight} className="fillHeight">
          {children}
        </Main>
        {IS_GENERATOR && showDeployButton && <VercelButton />}
        {IS_GENERATOR && showCustomizer && <Customizer />}
        <Footer />
      </BaseLayout>
    </ThemeProvider>
  );
};

PorfolioLayout.propTypes = {
  router: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default withRouter(PorfolioLayout);
