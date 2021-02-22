import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import dynamic from 'next/dynamic';
import { Tooltip } from '@components';
import { Icon } from '@components/Icons';
import { Folder, Star, Delete, Iconly } from 'react-iconly';
import { truncate } from 'lodash';
import { IS_GENERATOR, IS_PORTFOLIO } from '@lib/constants';
import { useIsMobile } from '@hooks';
import { StyledRepo, RepoActions } from './styles';

const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable));

// eslint-disable-next-line react/prop-types
const IconTooltip = ({ content, children }) => (
  <Tooltip size="big" position="right" content={content}>
    {children}
  </Tooltip>
);

const Repo = ({
  id,
  index,
  endIndex,
  name,
  description,
  stargazersCount,
  homepage,
  htmlUrl,
  forksCount,
  language,
  onLinkClicked,
  onDelete,
  onMove,
  ...props
}) => {
  const isMobile = useIsMobile();
  const RepoComponent = forwardRef(({ ...restProps }, ref) => (
    <StyledRepo ref={ref} {...restProps} {...props}>
      {IS_GENERATOR && (
        <RepoActions>
          <IconTooltip content={isMobile ? 'Move Up' : 'Move left'}>
            {index > 0 && (
              <Iconly
                name={isMobile ? 'ChevronUp' : 'ChevronLeft'}
                onClick={() => onMove(index, id, 'left')}
                className="chevron-icon"
                set="bold"
              />
            )}
          </IconTooltip>
          <IconTooltip content={isMobile ? 'Move Down' : 'Move right'}>
            {index < endIndex && (
              <Iconly
                name={isMobile ? 'ChevronDown' : 'ChevronRight'}
                onClick={() => onMove(index, id, 'right')}
                className="chevron-icon"
                set="bold"
              />
            )}
          </IconTooltip>
          <IconTooltip content="Delete repo">
            <Delete className="delete-icon" set="bold" onClick={() => onDelete(id)} />
          </IconTooltip>
        </RepoActions>
      )}
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Folder set="bulk" />
            </div>
            <div className="project-links">
              {htmlUrl && (
                <a onClick={() => onLinkClicked(htmlUrl)} aria-label="GitHub Link">
                  <Icon name="github" />
                </a>
              )}
              {homepage && (
                <a onClick={() => onLinkClicked(homepage)} aria-label="External Link">
                  <Icon name="external" />
                </a>
              )}
            </div>
          </div>
          <a
            onClick={() => onLinkClicked(htmlUrl)}
            className="project-title"
            aria-label="Project Link"
          >
            {name}
          </a>
          <p className="project-description">{truncate(description, { length: 80 })}</p>
        </header>
        <footer>
          <div className="metrics">
            {stargazersCount > 0 && (
              <a className="project-metric-value" rel="noreferrer" target="_blank" href={htmlUrl}>
                <Star size={20} />
                &nbsp;
                {stargazersCount}
              </a>
            )}
            {forksCount > 0 && (
              <a className="project-metric-value" rel="noreferrer" target="_blank" href={htmlUrl}>
                <Icon name="fork" className="filled" />
                &nbsp;
                {forksCount}
              </a>
            )}
          </div>
          {language && <p className="project-tech-name">{language}</p>}
        </footer>
      </div>
    </StyledRepo>
  ));

  if (IS_PORTFOLIO) {
    return <RepoComponent />;
  }
  return (
    <Draggable
      isDragDisabled={IS_PORTFOLIO || isMobile}
      key={id}
      draggableId={`${id}`}
      index={index}
    >
      {(provided) => (
        <RepoComponent
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};

Repo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  endIndex: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  homepage: PropTypes.string,
  htmlUrl: PropTypes.string,
  stargazersCount: PropTypes.number,
  forksCount: PropTypes.number,
  language: PropTypes.string,
  onLinkClicked: PropTypes.func,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

export default withTheme(Repo);
