import { NumberedHeading } from '@common/styles';
import PropTypes from 'prop-types';
import { StyledContactSection } from './styles';

const Contact = ({ user = {} }) => {
  return (
    <StyledContactSection id="contact">
      <NumberedHeading overline>What’s Next?</NumberedHeading>
      <h2 className="title">Get In Touch</h2>
      {user.isHireable ? (
        <p>
          I&apos;m currently open for new opportunities, feel free to get contact. If you have any
          questions or want to talk, I will do my best to get back.
        </p>
      ) : (
        <p>
          Although I&apos;m not currently looking for any new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll try my best to get
          back to you!
        </p>
      )}
      {user.email && (
        <a className="email-link" href={`mailto:${user.email}`}>
          Say Hello
        </a>
      )}
    </StyledContactSection>
  );
};
Contact.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Contact;
