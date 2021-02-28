import { useState, useEffect } from 'react';
import { Post } from '@components';
import { NumberedHeading } from '@common/styles';
import { get, isEmpty } from 'lodash';
import * as gtag from '@lib/gtag';
import { IS_PRODUCTION } from '@lib/constants';
import PropTypes from 'prop-types';
import { updateUser } from '@services/user';
import { reorder } from '@utils';
import { useToasts } from '@contexts/toasts';
import { ShowMoreButton, ButtonContainer, PostsContainer } from './styles';

const Blog = ({ user = {} }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { ToastsType, addToastWithTimeout } = useToasts();

  useEffect(() => {
    if (!isEmpty(get(user, 'posts'))) {
      setUserPosts(get(user, 'posts'));
    }
  }, []);

  const handleClickLink = (link) => {
    if (IS_PRODUCTION) {
      gtag.event('link_click', 'links', 'user clicked on a link button', link);
    }
    window.open(link, '_blank');
  };

  const updatePosts = (items) => {
    const input = {
      posts: items,
    };
    updateUser(get(user, 'username'), input)
      .then((res) => {
        if (res.success) {
          addToastWithTimeout(ToastsType.SUCCESS, 'Posts updated');
        } else {
          addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
        }
      })
      .catch((error) => {
        console.error(error);
        addToastWithTimeout(ToastsType.ERROR, 'Something went wrong, try again later');
      });
  };

  const handleMove = (index, direction) => {
    let endIndex = 0;
    if (direction === 'left') {
      endIndex = index - 1;
    } else {
      endIndex = index + 1;
    }
    const items = reorder(userPosts, index, endIndex);
    setUserPosts(items);
    updatePosts(items);
  };

  const handleDelete = (id) => {
    const items = userPosts.filter((repo) => repo.id !== id);
    setUserPosts(items);
    updatePosts(items);
  };

  const getBlogDomain = () => {
    if (user.hasHashnode && user?.hashnode?.publicationDomain) {
      return `https://${user.hashnode.publicationDomain}`;
    }
    if (user.hasHashnode) {
      return `https://hashnode.com/@${get(user, 'username')}`;
    }
    if (user.hasDevto) {
      return `https://dev.to/${get(user, 'username')}`;
    }
    return '#';
  };

  return (
    <section id="blog">
      <NumberedHeading>Latest Blogs</NumberedHeading>
      <PostsContainer>
        {userPosts &&
          userPosts.map((post, index) => {
            return (
              <Post
                key={post.id}
                index={index}
                hideMoveActions={userPosts.length === 1}
                endIndex={user.posts.length - 1}
                onMove={({ direction }) => handleMove(index, direction)}
                onDelete={handleDelete}
                {...post}
              />
            );
          })}
      </PostsContainer>
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
