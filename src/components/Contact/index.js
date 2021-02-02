import { NumberedHeading } from '@common/styles';
import { StyledContactSection } from './styles';

const Contact = () => {
  return (
    <StyledContactSection id="contact">
      <NumberedHeading overline>What’s Next?</NumberedHeading>
      <h2 className="title">Get In Touch</h2>
      <p>
        I&apos;m currently open for new opportunities, feel free to get contact. If you have any
        questions or want to talk, I will do my best to get back.
      </p>
      {/* <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a> */}
    </StyledContactSection>
  );
};

export default Contact;
