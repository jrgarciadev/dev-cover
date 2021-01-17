/* eslint-disable no-return-assign */
/* eslint-disable global-require */
import { useEffect, useRef } from 'react';
import { Icon } from '@components/Icons';
import { NumberedHeading } from '@common/styles';
import { featuredProjects } from '@config';
import { srConfig } from '@config/sr';
import {
  StyledProject,
  StyledProjectLinks,
  StyledProjectImgWrapper,
  StyledProjectImage,
} from './styles';

const Featured = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    const ScrollReveal = require('scrollreveal');
    const sr = ScrollReveal.default();
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <NumberedHeading ref={revealTitle}>Some Projects I’ve Built</NumberedHeading>

      <div>
        {featuredProjects &&
          featuredProjects.map((project, i) => {
            const { title, external, techs, github, cover, descriptionHtml } = project;
            return (
              <StyledProject key={title} ref={(el) => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <p className="project-overline">Featured Project</p>
                  <h3 className="project-title">{title}</h3>
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />

                  {techs.length && (
                    <ul className="project-tech-list">
                      {techs.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  )}

                  <StyledProjectLinks>
                    {github && (
                      <a rel="noreferrer" target="_blank" href={github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={external}
                        aria-label="External Link"
                      >
                        <Icon name="External" />
                      </a>
                    )}
                  </StyledProjectLinks>
                </div>

                <StyledProjectImgWrapper>
                  <a href={external || github || '#'}>
                    <div className="img-wrapper">
                      <div className="img-cont" />
                      <StyledProjectImage src={cover} alt={title} className="img" />
                    </div>
                  </a>
                </StyledProjectImgWrapper>
              </StyledProject>
            );
          })}
      </div>
    </section>
  );
};

export default Featured;
