import { NumberedHeading } from '@common/styles';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import { purgeUserReadme } from '@utils/user-mapping';
import { useUserDataContext } from '@contexts/user-data';
import { StyledAboutSection, StyledMarkdown } from './styles';

const About = () => {
  const { user } = useUserDataContext();
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

export default About;
