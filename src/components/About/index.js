/* eslint-disable global-require */
import { useEffect, useRef } from 'react';
import { NumberedHeading } from '@common/styles';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import { srConfig } from '@config/sr';
import { purgeUserReadme } from '@utils/user-mapping';
import { useUserDataContext } from '@contexts/user-data';
import { StyledAboutSection, StyledMarkdown } from './styles';

const About = () => {
  const revealContainer = useRef(null);
  const { user } = useUserDataContext();
  useEffect(() => {
    const ScrollReveal = require('scrollreveal');
    const sr = ScrollReveal.default();
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
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
