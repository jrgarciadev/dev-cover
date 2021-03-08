import { withTheme } from 'styled-components';
import { ArrowRight } from 'react-iconly';
import PropTypes from 'prop-types';
import { Corner } from '@components';
import { useForm } from 'react-hook-form';
import rules from '@common/rules';
import { isEmpty } from 'lodash';
import { toLowerCase } from '@utils';
import {
  StyledContainer,
  StyledForm,
  LargeLogo,
  HeroTitle,
  StyledInput,
  StyledButton,
  StyledErrorMessage,
  ProductHuntContainer,
} from './styles';

function HomeForm({ theme }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  });

  const { isValid } = formState;

  const onSubmit = ({ username }) => {
    if (!username) return;
    const formattedUsername = toLowerCase(username);
    if (window !== undefined) window.location = `/portfolio/${formattedUsername}`;
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
      <ProductHuntContainer>
        <a
          href="https://www.producthunt.com/posts/devcover?utm_source=badge-review&utm_medium=badge&utm_souce=badge-devcover#discussion-body"
          target="_blank"
          rel="noreferrer"
          style={{ margin: '1rem 0' }}
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=287287&theme=dark"
            alt="Devcover - Easiest way to generate a developer portfolio | Product Hunt"
            style={{ width: '250px', height: '54px' }}
            width="250"
            height="54"
          />
        </a>
      </ProductHuntContainer>
    </StyledContainer>
  );
}

HomeForm.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(HomeForm);
