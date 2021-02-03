import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '@themes/dark';
import { SkipToContentLink } from './styles';
import Main from './main';
import Footer from './footer';
import BaseLayout from './base';

const HomeLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BaseLayout>
        <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>
        <Main id="content" className="fillHeight">
          {children}
          <Footer simple />
        </Main>
      </BaseLayout>
    </ThemeProvider>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default HomeLayout;
