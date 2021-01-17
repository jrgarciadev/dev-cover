import { Hero, About, Featured, Projects, Contact } from '@components';
import { StyledMainContainer } from '@common/styles';

const IndexPage = () => (
  <StyledMainContainer className="fillHeight">
    <Hero />
    <About />
    <Featured />
    <Projects />
    <Contact />
  </StyledMainContainer>
);

export default IndexPage;
