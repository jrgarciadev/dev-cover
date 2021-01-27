import { useState } from 'react';
import { withTheme } from 'styled-components';
import { ArrowRight } from 'react-iconly';
import PropTypes from 'prop-types';
import { Corner } from '@components';
import {
  StyledContainer,
  StyledForm,
  LargeLogo,
  HeroTitle,
  StyledInput,
  StyledButton,
} from './styles';

function HomeForm({ theme }) {
  const [username, setUsername] = useState('');

  const handleChange = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || username.length < 2) {
      return;
    }
    if (window !== undefined) window.location = `/portfolio/${username}`;
  };

  return (
    <StyledContainer>
      <Corner />
      <LargeLogo alt="DevCover Logo" src="/devcover-logo.png" />
      <HeroTitle>Just type your username and watch the magic</HeroTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          placeholder="Github or Hashnode username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        <StyledButton type="submit" disabled={username.length < 3}>
          <ArrowRight set="light" primaryColor={theme.bg.default} />
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

HomeForm.propTypes = {
  theme: PropTypes.object,
};
export default withTheme(HomeForm);
