/* eslint-disable camelcase */
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION, GITHUB_URL } from '@lib/constants';
import * as gtag from '@lib/gtag';
import { NumberedHeading } from '@common/styles';
import { get, orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Repo } from '@components';

import { StyledProjectsSection, StyledGrid } from './styles';

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
              <Repo
                key={id}
                name={name}
                description={description}
                stargazersCount={stargazers_count}
                onLinkClicked={handleClickLink}
                homepage={homepage}
                htmlUrl={html_url}
                forksCount={forks_count}
                language={language}
              />
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
