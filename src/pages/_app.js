/* eslint-disable react/prop-types */
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import PortfolioLayout from '@layouts/portfolio';
import GlobalStyles from '@styles/globals';
import theme from '@themes/dark';
import * as gtag from '@lib/gtag';

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || PortfolioLayout;
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
