import PropTypes from 'prop-types';
import { getAvatar } from '@utils/user-mapping';
import Social from '../Social';
import {
  StyledHeroSection,
  StyledBigTitle,
  StyledPic,
  LeftContainer,
  RightContainer,
} from './styles';

const Hero = ({ user = {} }) => {
  return (
    <StyledHeroSection id="hero">
      <LeftContainer>
        <h1>Welcome, I&apos;m</h1>
        <StyledBigTitle>{user.name}</StyledBigTitle>
        <p>{user.largeBio}</p>
        {user.email && (
          <a href={`mailto:${user.email}`} className="email-link">
            Get In Touch
          </a>
        )}
      </LeftContainer>
      <RightContainer>
        <StyledPic>
          <div className="wrapper">
            <img alt="" width={300} height={300} src={getAvatar(user)} className="img" />
          </div>
        </StyledPic>
        <Social className="social-networks" />
      </RightContainer>
    </StyledHeroSection>
  );
};

Hero.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Hero;
