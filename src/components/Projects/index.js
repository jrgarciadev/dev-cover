/* eslint-disable camelcase */
import { Icon } from '@components/Icons';
import { Folder, Star } from 'react-iconly';
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION, GITHUB_URL } from '@lib/constants';
import * as gtag from '@lib/gtag';
import { NumberedHeading } from '@common/styles';
import { get, orderBy, truncate } from 'lodash';
import PropTypes from 'prop-types';
import { StyledProject, StyledProjectsSection, StyledGrid } from './styles';

const Projects = ({ user = {} }) => {
  const repos = orderBy(get(user, 'github.repos'), ['stargazers_count'], ['desc']);
  const reposToShow = repos.slice(0, PROJECTS_GRID_LIMIT);

  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('link_click', 'links', 'user clicked on a link button', link);
    }
    window.open(link, '_blank');
  };

  return (
    <StyledProjectsSection id="projects">
      <NumberedHeading>My Projects</NumberedHeading>
      <StyledGrid>
        {reposToShow &&
          reposToShow.map((repo) => {
            const {
              id,
              name,
              description,
              stargazers_count,
              homepage,
              html_url,
              forks_count,
              language,
            } = repo;
            return (
              <StyledProject key={id}>
                <div className="project-inner">
                  <header>
                    <div className="project-top">
                      <div className="folder">
                        <Folder set="bulk" />
                      </div>
                      <div className="project-links">
                        {html_url && (
                          <a onClick={() => handleClickLink(html_url)} aria-label="GitHub Link">
                            <Icon name="github" />
                          </a>
                        )}
                        {homepage && (
                          <a onClick={() => handleClickLink(homepage)} aria-label="External Link">
                            <Icon name="external" />
                          </a>
                        )}
                      </div>
                    </div>
                    <a
                      onClick={() => handleClickLink(html_url)}
                      className="project-title"
                      aria-label="Project Link"
                    >
                      {name}
                    </a>
                    <p className="project-description">{truncate(description, { length: 80 })}</p>
                  </header>
                  <footer>
                    <div className="metrics">
                      {stargazers_count > 0 && (
                        <a
                          className="project-metric-value"
                          rel="noreferrer"
                          target="_blank"
                          href={html_url}
                        >
                          <Star size={20} />
                          &nbsp;
                          {stargazers_count}
                        </a>
                      )}
                      {forks_count > 0 && (
                        <a
                          className="project-metric-value"
                          rel="noreferrer"
                          target="_blank"
                          href={html_url}
                        >
                          <Icon name="fork" className="filled" />
                          &nbsp;
                          {forks_count}
                        </a>
                      )}
                    </div>
                    {language && <p className="project-tech-name">{language}</p>}
                  </footer>
                </div>
              </StyledProject>
            );
          })}
      </StyledGrid>
      {repos && repos.length > reposToShow.length && (
        <a
          type="button"
          className="more-button"
          onClick={() => handleClickLink(`${GITHUB_URL}${get(user, 'github.login')}`)}
        >
          Show More
        </a>
      )}
    </StyledProjectsSection>
  );
};

Projects.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Projects;
