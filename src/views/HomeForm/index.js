import { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { ArrowRight } from 'react-iconly';
import PropTypes from 'prop-types';
import { Tooltip, Corner } from '@components';
import { useForm } from 'react-hook-form';
import rules from '@common/rules';
import { isEmpty } from 'lodash';
import { toLowerCase } from '@utils';
import { useToasts } from '@contexts/toasts';
import {
  StyledContainer,
  StyledForm,
  LargeLogo,
  HeroTitle,
  StyledInput,
  StyledButton,
  StyledErrorMessage,
  ProductHuntContainer,
  RemainingPortfolios,
} from './styles';

function HomeForm({ theme, remaining }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
  });
  const { ToastsType, addToastWithTimeout } = useToasts();

  useEffect(async () => {
    if (remaining === 0) {
      addToastWithTimeout(ToastsType.ERROR, 'Github API rate limit exceeded try again in 1 hour');
    }
  }, []);

  const { isValid } = formState;

  const onSubmit = ({ username }) => {
    if (!username || remaining === 0) return;
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
          disabled={remaining === 0}
          placeholder="Github username"
          name="username"
          type="text"
          ref={register(rules.username)}
          error={!isEmpty(errors.username)}
        />
        <StyledButton type="submit" disabled={!isValid || remaining === 0}>
          <ArrowRight set="light" primaryColor={theme.bg.default} />
        </StyledButton>
      </StyledForm>
      <StyledErrorMessage>
        {!isEmpty(errors.username) && errors.username.message}
      </StyledErrorMessage>
      <RemainingPortfolios>
        <Tooltip
          size="big"
          position="bottom"
          content="GitHub limits the number of requests per hour to 60 for unauthenticated users"
        >
          <RemainingPortfolios>
            <p>Available requests</p>
            <p>
              {remaining}
              /60
            </p>
          </RemainingPortfolios>
        </Tooltip>
        {remaining === 0 && (
          <p className="github-rate">
            Github API rate limit exceeded try again in 1 hour&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.github.com/es/github-ae@latest/rest/reference/rate-limit"
            >
              Docs
            </a>
          </p>
        )}
      </RemainingPortfolios>
      <ProductHuntContainer>
        <a
          href="https://www.producthunt.com/posts/devcover?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-devcover"
          target="_blank"
          rel="noreferrer"
          style={{ margin: '1rem 0' }}
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=287287&theme=dark"
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
  remaining: PropTypes.number,
};

export default withTheme(HomeForm);
