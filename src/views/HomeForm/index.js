import { useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleChange = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || username.length < 2) {
      return;
    }
    router.push('/portfolio/[username]', `/portfolio/${username}`);
  };

  return (
    <StyledContainer>
      <Corner />
      <LargeLogo alt="DevCover Logo" src="/devcover-logo.svg" />
      <HeroTitle>Just type your username and watch the magic</HeroTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          placeholder="Github Username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        <StyledButton type="submit">
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
