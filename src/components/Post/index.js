import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { IconFeatured } from '@components/Icons';
import { withTheme } from 'styled-components';
import { Heart, Chat } from 'react-iconly';
import { formatPostDate } from '@utils';
import dynamic from 'next/dynamic';
import { useUIContext } from '@contexts/ui';
import { StyledContainer, LeftContainer, RightContainer, ImageContainer } from './styles';

const ActionButtons = dynamic(() => import('@components/ActionButtons'));

const Post = ({
  index = 0,
  endIndex = 0,
  id = '',
  theme,
  featured = false,
  provider = '',
  title = '',
  description = '',
  hideMoveActions = false,
  cover = '',
  created = '',
  url = '#',
  likes = 0,
  comments = 0,
  onMove,
  onDelete,
  ...props
}) => {
  const { isEditable } = useUIContext();
  return (
    <StyledContainer key={title} {...props}>
      <LeftContainer isGenerator={isEditable}>
        {isEditable && (
          <ActionButtons
            onlyDownUp
            id={id}
            index={index}
            onMove={onMove}
            hideMove={hideMoveActions}
            onDelete={onDelete}
            showLeft={index > 0}
            showRight={index < endIndex}
          />
        )}
        {featured && (
          <p className="featured">
            <IconFeatured />
            {`Featured on ${capitalize(provider)}`}
          </p>
        )}
        <p className="date">{formatPostDate(created)}</p>
        <a className="title" href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
        <a className="description" href={url} target="_blank" rel="noreferrer">
          {description}
        </a>
        <div className="insights">
          <a className="likes" href={url} target="_blank" rel="noreferrer">
            <Heart set="light" primaryColor={theme.brand.primary} />
            <p>
              {likes}
              &nbsp;likes
            </p>
          </a>
          <a className="comments" href={url} target="_blank" rel="noreferrer">
            <Chat set="light" primaryColor={theme.brand.primary} />
            <p>
              {comments}
              &nbsp;comments
            </p>
          </a>
        </div>
      </LeftContainer>
      <RightContainer>
        {cover && (
          <ImageContainer href={url} target="_blank" rel="noreferrer">
            <img src={cover} alt={title} width={300} />
          </ImageContainer>
        )}
      </RightContainer>
    </StyledContainer>
  );
};

Post.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  endIndex: PropTypes.number,
  theme: PropTypes.object,
  featured: PropTypes.bool,
  url: PropTypes.string,
  provider: PropTypes.oneOf(['hashnode', 'devto']),
  hideMoveActions: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  created: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

export default withTheme(Post);
