import { withTheme } from 'styled-components';
import { ArrowRight } from 'react-iconly';
import PropTypes from 'prop-types';
import { Corner } from '@components';
import { useForm } from 'react-hook-form';
import rules from '@common/rules';
import { isEmpty } from 'lodash';
import {
  StyledContainer,
  StyledForm,
  LargeLogo,
  HeroTitle,
  StyledInput,
  StyledButton,
  StyledErrorMessage,
} from './styles';

function HomeForm({ theme }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  });

  const { isValid } = formState;

  const onSubmit = ({ username }) => {
    if (window !== undefined) window.location = `/portfolio/${username}`;
  };

  return (
    <StyledContainer>
      <Corner />
      <LargeLogo alt="DevCover Logo" src="/devcover-logo.png" />
      <HeroTitle>Just type your username and watch the magic</HeroTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          placeholder="Github username"
          name="username"
          type="text"
          ref={register(rules.username)}
          error={!isEmpty(errors.username)}
        />
        <StyledButton type="submit" disabled={!isValid}>
          <ArrowRight set="light" primaryColor={theme.bg.default} />
        </StyledButton>
      </StyledForm>
      <StyledErrorMessage>
        {!isEmpty(errors.username) && errors.username.message}
      </StyledErrorMessage>
    </StyledContainer>
  );
}

HomeForm.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(HomeForm);
