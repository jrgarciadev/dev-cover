/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable global-require */
/* eslint-disable no-return-assign */
import { useEffect, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Icon } from '@components/Icons';
import { projects } from '@config';
import { srConfig } from '@config/sr';
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION } from '@lib/constants';
import * as gtag from '@lib/gtag';
import { StyledProject, StyledProjectsSection } from './styles';

const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const firstSix = projects.slice(0, PROJECTS_GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    const ScrollReveal = require('scrollreveal');
    const sr = ScrollReveal.default();
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const handleClickProject = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('click_project', 'projects', 'user clicked on project link button', link);
    }
    window.open(link, '_blank');
  };

  return (
    <StyledProjectsSection>
      <div className="title-container" ref={revealTitle}>
        <h2>Other Projects</h2>
        {/*   <Link href="/archive">
          <a className="archive-link inline-link">View all projects</a>
        </Link> */}
      </div>
      <TransitionGroup className="projects-grid">
        {projectsToShow &&
          projectsToShow.map((project, i) => {
            const { title, descriptionHtml, github, external, techs } = project;

            return (
              <CSSTransition
                key={title}
                classNames="fadeup"
                timeout={i >= PROJECTS_GRID_LIMIT ? (i - PROJECTS_GRID_LIMIT) * 300 : 300}
                exit={false}
              >
                <StyledProject
                  key={title}
                  ref={(el) => (revealProjects.current[i] = el)}
                  tabIndex="0"
                  style={{
                    transitionDelay: `${
                      i >= PROJECTS_GRID_LIMIT ? (i - PROJECTS_GRID_LIMIT) * 100 : 0
                    }ms`,
                  }}
                >
                  <div className="project-inner">
                    <header>
                      <div className="project-top">
                        <div className="folder">
                          <Icon name="Folder" />
                        </div>
                        <div className="project-links">
                          {github && (
                            <a onClick={() => handleClickProject(github)} aria-label="GitHub Link">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a
                              onClick={() => handleClickProject(external)}
                              aria-label="External Link"
                            >
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="project-title">{title}</h3>

                      <div
                        className="project-description"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                      />
                    </header>

                    <footer>
                      {techs && (
                        <ul className="project-tech-list">
                          {techs.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  </div>
                </StyledProject>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
      {projects && projects.length > 6 && (
        <button type="button" className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
