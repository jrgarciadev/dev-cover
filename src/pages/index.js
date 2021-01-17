import { HomeForm } from '@views';
import { StyledMainContainer } from '@common/styles';
import HomeLayout from '@layouts/home';

const IndexPage = () => (
  <StyledMainContainer className="fillHeight">
    <HomeForm />
  </StyledMainContainer>
);

IndexPage.Layout = HomeLayout;

export default IndexPage;
