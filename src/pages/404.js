import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { NAV_DELAY } from '@lib/constants';

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  color: ${(props) => props.theme.brand.primary};
  font-family: ${(props) => props.theme.fontFamily.fontMono};
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;
const StyledHomeButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 40px;
`;

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), NAV_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <TransitionGroup component={null}>
      {isMounted && (
        <CSSTransition timeout={500} classNames="fadeup">
          <StyledMainContainer className="fillHeight">
            <StyledTitle>404</StyledTitle>
            <StyledSubtitle>Page Not Found</StyledSubtitle>
            <Link href="/">
              <StyledHomeButton>Go Home</StyledHomeButton>
            </Link>
          </StyledMainContainer>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default NotFoundPage;
