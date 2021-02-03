import { IS_PRODUCTION } from '@lib/constants';
import * as gtag from '@lib/gtag';
import { ButtonContainer, StyledButton } from './styles';

const VercelButton = () => {
  const deployUrl = 'https://vercel.com/new/git/external?repository-url=';
  const repository = 'https%3A%2F%2Fgithub.com%2Fjrgarciadev%2Fdev-cover';
  const variables = `&env=NEXT_PUBLIC_USERNAME`;
  const projectName = '&project-name=my-awesome-portfolio';
  const repositoryName = '&repository-name=my-awesome-portfolio';
  const envDescription = '&envDescription=Enter%20your%20Github%20username%20.';
  const demoTitle = '&demo-title=APM%20Story';
  const demoDescription = '&A%20statically%20generated%portfolio%created%20using%20Devcover';
  const link = `${deployUrl}${repository}${variables}${projectName}${repositoryName}${envDescription}${demoTitle}${demoDescription}`;
  const handleClickLink = () => {
    if (IS_PRODUCTION) {
      gtag.event('vercel_deploy', 'deploy', 'user clicked on vercel deploy button button', link);
    }
    window.open(link, '_blank');
  };
  return (
    <ButtonContainer>
      <StyledButton rel="noreferrer" target="_blank" onClick={handleClickLink}>
        <img width={20} height={20} src="/vercel-light-logo.svg" alt="Vercel Logo" />
        <span>Deploy on Vercel</span>
      </StyledButton>
    </ButtonContainer>
  );
};

export default VercelButton;
