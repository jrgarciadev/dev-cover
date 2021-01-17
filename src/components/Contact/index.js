/* eslint-disable global-require */
import { useEffect, useRef } from 'react';
import { email } from '@config';
import { srConfig } from '@config/sr';
import { NumberedHeading } from '@common/styles';
import { StyledContactSection } from './styles';

const Contact = () => {
  const revealContainer = useRef(null);
  useEffect(() => {
    const ScrollReveal = require('scrollreveal');
    const sr = ScrollReveal.default();
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <NumberedHeading overline>What’s Next?</NumberedHeading>

      <h2 className="title">Get In Touch</h2>

      <p>
        I&apos;m currently open for new opportunities, feel free to get contact. If you have any
        questions or want to talk, I will do my best to get back.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
