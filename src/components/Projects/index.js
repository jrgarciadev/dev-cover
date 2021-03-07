/* eslint-disable camelcase */
import { useState, forwardRef } from 'react';
import { PROJECTS_GRID_LIMIT, IS_PRODUCTION, GITHUB_URL } from '@lib/constants';
import { useUIContext } from '@contexts/ui';
import * as gtag from '@lib/gtag';
import { NumberedHeading, SectionButton } from '@common/styles';
import { get, size } from 'lodash';
import { reorder } from '@utils';
import PropTypes from 'prop-types';
import { Repo } from '@components';
import { useToasts } from '@contexts/toasts';
import { useIsMobile } from '@hooks';
import { updateUser } from '@services/user';
import dynamic from 'next/dynamic';
import { Swap, Plus } from 'react-iconly';
import { getReposData } from '@lib/user-builder';
import { useUserDataContext } from '@contexts/user-data';
import { StyledProjectsSection, StyledGrid } from './styles';

const Droppable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Droppable));
const DragDropContext = dynamic(() =>
  import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
);

const Projects = ({ user = {} }) => {
  const [userRepos, setUserRepos] = useState(get(user, 'repos'));
  const [loading, setLoading] = useState(false);
  const { ToastsType, addToastWithTimeout } = useToasts();
  const { updateValue: updateUserData } = useUserDataContext();
  const isMobile = useIsMobile();
  const { isEditable } = useUIContext();

  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('link_click', 'links', 'user clicked on a link button', link);
    }
    window.open(link, '_blank');
  };

  const updateRepos = (items, inputData = {}) => {
    const input = {
      repos: items.slice(0, PROJECTS_GRID_LIMIT),
      ...inputData,
    };
    updateUser(get(user, 'username'), input)
      .then((res) => {
        if (res.success) {
          addToastWithTimeout(ToastsType.SUCCESS, 'Repos updated');
        } else {
          addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
        }
      })
      .catch((error) => {
        console.error(error);
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
      });
  };

  const handleChange = (items, inputData = {}) => {
    setUserRepos(items);
    updateRepos(items, inputData);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const items = reorder(userRepos, source.index, destination.index);
    handleChange(items);
  };

  const handleDeleteRepo = (id) => {
    const items = userRepos.filter((repo) => repo.id !== id);
    if (items.length <= 0) {
      const input = { showRepos: false };
      updateUserData({ ...user, ...input });
    }
    handleChange(items);
  };

  const handleMove = (index, direction) => {
    let endIndex = 0;
    if (direction === 'left') {
      endIndex = index - 1;
    } else {
      endIndex = index + 1;
    }
    const items = reorder(userRepos, index, endIndex);
    handleChange(items);
  };

  const handleFetchGithubRepos = async (input = {}) => {
    setLoading(true);
    try {
      const repos = await getReposData(get(user, 'username'));
      console.log(repos);
      handleChange(repos, input);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (get(user, 'github.limited') === true) {
        addToastWithTimeout(ToastsType.ERROR, 'Github API rate limit exceeded try again in 1 hour');
      } else {
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again in 1 hour');
      }
    }
  };

  const handleAddReposSection = async () => {
    const input = { showRepos: true };
    await handleFetchGithubRepos(input);
    updateUserData({ ...user, ...input });
  };

  const RepoGrid = forwardRef(({ ...restProps }, ref) => (
    <StyledGrid ref={ref} {...restProps}>
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
              hideMoveActions={userRepos.length === 1}
              endIndex={PROJECTS_GRID_LIMIT - 1}
              name={name}
              description={description}
              stargazersCount={stargazers_count}
              onLinkClicked={handleClickLink}
              homepage={homepage}
              htmlUrl={html_url}
              forksCount={forks_count}
              language={language}
              onDelete={handleDeleteRepo}
              onMove={({ direction }) => handleMove(index, direction)}
            />
          );
        })}
    </StyledGrid>
  ));

  if (!user?.showRepos && size(get(user, 'repos')) > 0 && isEditable) {
    return (
      <SectionButton>
        <button onClick={handleAddReposSection} type="button">
          <Plus />
          {loading ? 'Adding...' : 'Add repos section'}
        </button>
      </SectionButton>
    );
  }

  return (
    <StyledProjectsSection id="projects">
      <NumberedHeading>My Projects</NumberedHeading>
      {isEditable ? (
        <>
          <button type="button" className="show-original" onClick={() => handleFetchGithubRepos()}>
            <Swap />
            {loading ? 'Fetching...' : ' Fetch Github repos'}
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              isDropDisabled={!isEditable || isMobile}
              droppableId="droppable-repos"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <RepoGrid
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                />
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <RepoGrid />
      )}
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
