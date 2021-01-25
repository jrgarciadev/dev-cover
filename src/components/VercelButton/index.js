import { ButtonContainer } from './styles';

const VercelButton = () => {
  const deployUrl = 'https://vercel.com/new/git/external?repository-url=';
  const repository = 'https%3A%2F%2Fgithub.com%2Fjrgarciadev%2Fdev-cover';
  const variables = `&env=NEXT_PUBLIC_USERNAME`;
  const projectName = '&project-name=my-awesome-portfolio';
  const repositoryName = '&repository-name=my-awesome-portfolio';
  const envDescription = '&envDescription=Enter%20your%20Github%20username%20.';
  const demoTitle = '&demo-title=APM%20Story';
  const demoDescription = '&A%20statically%20generated%portfolio%created%20using%20Devcover';

  return (
    <ButtonContainer>
      <a
        rel="noreferrer"
        target="_blank"
        href={`${deployUrl}${repository}${variables}${projectName}${repositoryName}${envDescription}${demoTitle}${demoDescription}`}
      >
        <img src="https://vercel.com/button" alt="Deploy with Vercel" />
      </a>
    </ButtonContainer>
  );
};

export default VercelButton;
