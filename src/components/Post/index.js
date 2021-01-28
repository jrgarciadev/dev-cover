import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { IconFeatured } from '@components/Icons';
import { withTheme } from 'styled-components';
import { Heart, Chat } from 'react-iconly';
import { formatPostDate } from '@utils';
import { StyledContainer, LeftContainer, RightContainer, ImageContainer } from './styles';

const Post = ({
  theme,
  featured = false,
  provider = '',
  title = '',
  description = '',
  cover = '',
  createdAt = '',
  url = '#',
  likes = 0,
  comments = 0,
}) => (
  <StyledContainer key={title}>
    <LeftContainer>
      {featured && (
        <p className="featured">
          <IconFeatured />
          {`Featured on ${capitalize(provider)}`}
        </p>
      )}
      <p className="date">{formatPostDate(createdAt)}</p>
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

Post.propTypes = {
  theme: PropTypes.object,
  featured: PropTypes.bool,
  url: PropTypes.string,
  provider: PropTypes.oneOf(['hashnode', 'devto']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
};

export default withTheme(Post);
