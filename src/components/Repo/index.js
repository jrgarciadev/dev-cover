import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Tooltip } from '@components';
import { Icon } from '@components/Icons';
import { Folder, Star, Delete } from 'react-iconly';
import { truncate } from 'lodash';
import { Draggable } from 'react-beautiful-dnd';
import { IS_GENERATOR, IS_PORTFOLIO } from '@lib/constants';
import { StyledRepo } from './styles';

const Repo = ({
  id,
  index,
  name,
  description,
  stargazersCount,
  homepage,
  htmlUrl,
  forksCount,
  language,
  onLinkClicked,
  onDelete,
}) => {
  return (
    <Draggable isDragDisabled={IS_PORTFOLIO} key={id} draggableId={`${id}`} index={index}>
      {(provided) => (
        <StyledRepo
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {IS_GENERATOR && (
            <Tooltip
              size="big"
              position="right"
              style={{ position: 'absolute', top: '0', right: '-0.5rem' }}
              content="Delete repo"
            >
              <Delete className="delete-icon" set="bold" onClick={() => onDelete(id)} />
            </Tooltip>
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
                  <a
                    className="project-metric-value"
                    rel="noreferrer"
                    target="_blank"
                    href={htmlUrl}
                  >
                    <Star size={20} />
                    &nbsp;
                    {stargazersCount}
                  </a>
                )}
                {forksCount > 0 && (
                  <a
                    className="project-metric-value"
                    rel="noreferrer"
                    target="_blank"
                    href={htmlUrl}
                  >
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
      )}
    </Draggable>
  );
};

Repo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  homepage: PropTypes.string,
  htmlUrl: PropTypes.string,
  stargazersCount: PropTypes.number,
  forksCount: PropTypes.number,
  language: PropTypes.string,
  onLinkClicked: PropTypes.func,
  onDelete: PropTypes.func,
};

export default withTheme(Repo);
