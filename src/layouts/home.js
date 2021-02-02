import PropTypes from 'prop-types';
import { SkipToContentLink } from './styles';
import Main from './main';
import Footer from './footer';
import BaseLayout from './base';

const HomeLayout = ({ children }) => {
  return (
    <BaseLayout>
      <SkipToContentLink href="#content">Skip to Content</SkipToContentLink>
      <Main id="content" className="fillHeight">
        {children}
        <Footer simple />
      </Main>
    </BaseLayout>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default HomeLayout;
