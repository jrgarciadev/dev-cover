/* eslint-disable camelcase */
import { Post } from '@components';
import { NumberedHeading } from '@common/styles';
import { get } from 'lodash';
import * as gtag from '@lib/gtag';
import { IS_PRODUCTION } from '@lib/constants';
import PropTypes from 'prop-types';
import { ShowMoreButton, ButtonContainer } from './styles';

const Blog = ({ user = {} }) => {
  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('link_click', 'links', 'user clicked on a link button', link);
    }
    window.open(link, '_blank');
  };

  const renderPosts = () => (
    <>
      {user?.posts?.hashnode &&
        user?.posts?.hashnode.map((post) => {
          const {
            _id,
            title,
            slug,
            totalReactions,
            brief,
            replyCount,
            responseCount,
            coverImage,
            dateFeatured,
            dateAdded,
          } = post;
          const url = user?.hashnode?.publicationDomain
            ? `http://${user?.hashnode?.publicationDomain}/${slug}`
            : '#';
          return (
            <Post
              key={_id}
              provider="hashnode"
              title={title}
              url={url}
              likes={totalReactions}
              comments={replyCount + responseCount}
              description={brief}
              cover={coverImage}
              featured={dateFeatured !== null}
              createdAt={dateAdded}
            />
          );
        })}
      {user?.posts?.devto &&
        user?.posts?.devto.map((post) => {
          const {
            id,
            title,
            url,
            positive_reactions_count,
            description,
            published_timestamp,
            comments_count,
            cover_image,
          } = post;

          return (
            <Post
              key={id}
              provider="hashnode"
              title={title}
              url={url}
              likes={positive_reactions_count}
              comments={comments_count}
              description={description}
              cover={cover_image}
              createdAt={published_timestamp}
            />
          );
        })}
    </>
  );

  const getBlogDomain = () => {
    if (user.hasHashnode && user?.hashnode?.publicationDomain) {
      return `https://${user.hashnode.publicationDomain}`;
    }
    if (user.hasHashnode) {
      return `https://hashnode.com/@${get(user, 'username')}`;
    }
    if (user.hasDevto) {
      return `https://dev.to/${user.username}`;
    }
    return '#';
  };

  return (
    <section id="blog">
      <NumberedHeading>Latest Blogs</NumberedHeading>
      <div>{user.posts && renderPosts()}</div>
      <ButtonContainer>
        <ShowMoreButton
          onClick={() => handleClickLink(getBlogDomain())}
          target="_blank"
          rel="noreferrer"
        >
          Show More
        </ShowMoreButton>
      </ButtonContainer>
    </section>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Blog;
