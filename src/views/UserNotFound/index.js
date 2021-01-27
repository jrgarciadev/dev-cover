import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseSquare, ArrowLeft } from 'react-iconly';
import { withTheme } from 'styled-components';
import { Icon } from '@components';
import { useUIContext } from '@contexts/ui';
import { IS_GENERATOR, MAIN_SITE_URL } from '@lib/constants';
import { StyledContainer, SuggestedContainer, BrandButton } from './styles';

function UserNotFoundView({ theme, username }) {
  const { updateValue } = useUIContext();
  useEffect(() => {
    updateValue({ showNavbar: false, mainFullHeight: false });
  }, []);
  return (
    <StyledContainer>
      <CloseSquare set="bulk" size={80} primaryColor={theme.brand.primary} />
      <h1>
        Sorry there is not enough information for the user&nbsp;
        <b>{`"${username}"`}</b>
      </h1>
      <SuggestedContainer>
        <h3>You can start as follows:</h3>
        <BrandButton color="#2962ff" href="https://hashnode.com/" target="_blank" rel="norefferer">
          <Icon name="hashnode" />
          <p>Start a blog on Hashnode</p>
        </BrandButton>
        <BrandButton color="#333333" href="https://github.com/" target="_blank" rel="norefferer">
          <Icon name="github" />
          <p>Create an account on Github</p>
        </BrandButton>
        <BrandButton color="#47bda5" href="https://dev.to/" target="_blank" rel="norefferer">
          <Icon name="devto" />
          <p>Start a blog on Dev.to</p>
        </BrandButton>
        {IS_GENERATOR ? (
          <BrandButton color={theme.bg.default} href="/">
            <ArrowLeft set="two-tone" primaryColor={theme.bg.reverse} />
            <p>Back home</p>
          </BrandButton>
        ) : (
          <BrandButton color={theme.bg.default} href={MAIN_SITE_URL}>
            <Icon name="devcover" />
            <p>Generate portfolio again</p>
          </BrandButton>
        )}
      </SuggestedContainer>
    </StyledContainer>
  );
}

UserNotFoundView.propTypes = {
  theme: PropTypes.object,
  username: PropTypes.string,
};
export default withTheme(UserNotFoundView);
