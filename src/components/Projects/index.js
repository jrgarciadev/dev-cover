/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION, IS_PORTFOLIO, GITHUB_URL } from '@lib/constants';
import * as gtag from '@lib/gtag';
import { NumberedHeading } from '@common/styles';
import { get, isEmpty, orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Repo } from '@components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useToasts } from '@contexts/toasts';
import { updateUser } from '@services/user';
import { StyledProjectsSection, StyledGrid } from './styles';

const Projects = ({ user = {} }) => {
  const [userRepos, setUserRepos] = useState([]);
  const { ToastsType, addToastWithTimeout } = useToasts();

  useEffect(() => {
    if (IS_PORTFOLIO && !isEmpty(get(user, 'repos'))) {
      setUserRepos(get(user, 'repos'));
    } else {
      const repos = orderBy(get(user, 'github.repos'), ['stargazers_count'], ['desc']);
      setUserRepos(repos);
    }
  }, []);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('link_click', 'links', 'user clicked on a link button', link);
    }
    window.open(link, '_blank');
  };

  const updateRepos = async (items) => {
    const input = {
      repos: items.slice(0, PROJECTS_GRID_LIMIT),
    };
    try {
      const res = await updateUser(get(user, 'username'), input);
      if (res.success) {
        addToastWithTimeout(ToastsType.SUCCESS, 'Profile Saved');
      } else {
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
      }
    } catch (error) {
      console.error(error);
      addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const items = reorder(userRepos, source.index, destination.index);
    setUserRepos(items);
    updateRepos(items);
  };

  const handleDeleteRepo = (id) => {
    const items = userRepos.filter((repo) => repo.id !== id);
    setUserRepos(items);
    updateRepos(items);
  };

  return (
    <StyledProjectsSection id="projects">
      <NumberedHeading>My Projects</NumberedHeading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          isDropDisabled={IS_PORTFOLIO}
          droppableId="droppable-repos"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <StyledGrid
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {userRepos &&
                userRepos.slice(0, PROJECTS_GRID_LIMIT).map((repo, index) => {
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
                      id={id}
                      index={index}
                      name={name}
                      description={description}
                      stargazersCount={stargazers_count}
                      onLinkClicked={handleClickLink}
                      homepage={homepage}
                      htmlUrl={html_url}
                      forksCount={forks_count}
                      language={language}
                      onDelete={handleDeleteRepo}
                    />
                  );
                })}
            </StyledGrid>
          )}
        </Droppable>
      </DragDropContext>
      {userRepos && userRepos.length > PROJECTS_GRID_LIMIT && (
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
