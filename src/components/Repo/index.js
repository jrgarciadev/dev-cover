import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import dynamic from 'next/dynamic';
import { Icon } from '@components/Icons';
import { Folder, Star } from 'react-iconly';
import { truncate } from 'lodash';
import { IS_GENERATOR, IS_PORTFOLIO } from '@lib/constants';
import { useIsMobile } from '@hooks';
import { StyledRepo } from './styles';

const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable));
const ActionButtons = dynamic(() => import('@components/ActionButtons'));

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
        <ActionButtons
          id={id}
          index={index}
          onMove={onMove}
          onDelete={onDelete}
          showLeft={index > 0}
          showRight={index < endIndex}
        />
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
