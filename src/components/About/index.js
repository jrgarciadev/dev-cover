import { NumberedHeading } from '@common/styles';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import { purgeUserReadme } from '@utils/user-mapping';
import PropTypes from 'prop-types';
import { StyledAboutSection, StyledMarkdown } from './styles';

const About = ({ user = {} }) => {
  return (
    <StyledAboutSection id="about">
      <NumberedHeading>About Me</NumberedHeading>
      <StyledMarkdown>
        <ReactMarkdownWithHtml unwrapDisallowed allowDangerousHtml>
          {purgeUserReadme(user?.github?.readme)}
        </ReactMarkdownWithHtml>
      </StyledMarkdown>
    </StyledAboutSection>
  );
};

About.propTypes = {
  user: PropTypes.object.isRequired,
};
export default About;
