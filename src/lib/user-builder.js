import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';
import { cleanAttrs, getStringByCriteria } from '@utils';
import { getGithubReadmeURL, getNameUser } from '@utils/user-mapping';
import { get, has, chunk, first, replace, orderBy, isEmpty } from 'lodash';
import { GITHUB_URL, GITHUB_USER_URL, DEVTO_USER_URL, DEVTO_ARTICLES_URL } from './constants';

const stringSimilarity = require('string-similarity');

const fetchUserReadme = async (username) => {
  try {
    let githubReadmeRes = await fetch(getGithubReadmeURL(username, 'main'));
    let githubReadmeData = await githubReadmeRes.text();
    if (githubReadmeData.includes('404')) {
      githubReadmeRes = await fetch(getGithubReadmeURL(username, 'master'));
      githubReadmeData = await githubReadmeRes.text();
    }
    return githubReadmeData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchDevtoPosts = async (username) => {
  try {
    const devtoArticlesRes = await fetch(`${DEVTO_ARTICLES_URL}${username}`);
    const devtoArticlesData = await devtoArticlesRes.json();
    return devtoArticlesData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const buildPosts = async (user) => {
  if (!user || (!user.hasHashnode && !user.hasDevto)) {
    return [];
  }
  let devtoPosts = [];
  let hashnodePosts = [];
  if (user.hasDevto) {
    devtoPosts = await fetchDevtoPosts(user.username);
    if (devtoPosts.length > 0) {
      devtoPosts = first(chunk(orderBy(devtoPosts, ['positive_reactions_count'], ['desc']), 4));
    }
  }
  if (user.hasHashnode) {
    hashnodePosts = first(
      chunk(orderBy(user.hashnode.publication.posts, ['totalReactions'], ['desc']), 4),
    );
  }
  if (hashnodePosts.length > 0 && devtoPosts.length > 0) {
    if (devtoPosts.length > hashnodePosts.length) {
      devtoPosts.forEach((post) => {
        hashnodePosts.forEach((hnPost) => {
          const similar = stringSimilarity.compareTwoStrings(hnPost.title, post.title) > 0.8;
          if (similar) {
            hashnodePosts = hashnodePosts.filter((p) => p._id !== hnPost._id);
          }
        });
      });
      return {
        hashnode: hashnodePosts,
        devto: devtoPosts,
      };
    }
    hashnodePosts.forEach((hnPost) => {
      devtoPosts.forEach((post) => {
        const similar = stringSimilarity.compareTwoStrings(hnPost.title, post.title) > 0.8;
        if (similar) {
          devtoPosts = devtoPosts.filter((p) => p.id !== post.id);
        }
      });
    });

    return {
      hashnode: hashnodePosts,
      devto: devtoPosts,
    };
  }
  if (hashnodePosts.length > 0) {
    return {
      hashnode: hashnodePosts,
    };
  }
  if (devtoPosts.length > 0) {
    return {
      devto: devtoPosts,
    };
  }
  return null;
};

const getReposData = async (username) => {
  try {
    const response = await fetch(`${GITHUB_USER_URL}${username}/repos?per_page=100`);
    if (response.status === 404 || response.status === 403) {
      return [];
    }
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fullfillUser = async ({ username, github = {}, hashnode = {}, devto = {} }) => {
  const user = {
    github,
    hashnode,
    devto,
  };
  if (!github.login) {
    let githubUsername = '';
    if (get(hashnode, 'socialMedia.github')) {
      githubUsername = replace(get(hashnode, 'socialMedia.github'), GITHUB_URL, '');
    } else if (get(devto, 'github_username')) {
      githubUsername = get(devto, 'github_username');
    }
    user.github.login = githubUsername;
  }
  if (user.github.login) {
    if (
      has(hashnode, 'socialMedia.github') &&
      get(hashnode, 'socialMedia.github') !== user.github.login
    ) {
      user.github.login = replace(get(hashnode, 'socialMedia.github'), GITHUB_URL, '');
    }
    const githubUserRes = await fetch(`${GITHUB_USER_URL}${user.github.login}`);
    const githubUserData = await githubUserRes.json();
    const githubReadmeData = await fetchUserReadme(user.github.login);
    const githubReposData = await getReposData(user.github.login);
    user.github = cleanAttrs(githubUserData);
    user.github.readme = githubReadmeData;
    user.github.repos = githubReposData;
  }
  const userBioArray = [user?.devto?.summary, user?.github?.bio, user?.hashnode?.tagline];
  user.name = getNameUser(user) ?? '';
  user.username = username;
  user.shortDescription = getStringByCriteria(userBioArray, 'shortest') ?? '';
  user.largeDescription = getStringByCriteria(userBioArray) ?? '';
  user.hasGithub = !isEmpty(get(user, 'github.login'));
  user.hasHashnode = has(user, 'hashnode.name');
  user.hasDevto = get(user, 'devto.status') !== 404;
  user.hasReadme = has(user, 'github.readme') && !get(user, 'github.readme').includes('404');
  try {
    user.posts = await buildPosts(user);
    user.hasPosts = user.posts && (user.posts.hashnode.length > 0 || user.posts.devto.length > 0);
  } catch (error) {
    console.error(error);
    user.hasPosts = false;
    user.posts = null;
  }

  return user;
};

const buildUser = async (params) => {
  const apolloClient = initializeApollo();
  const { username } = params;
  const githubUserResponse = await fetch(`${GITHUB_USER_URL}${username}`);
  const githubUserRes = await githubUserResponse.json();
  const devtoUserResponse = await fetch(`${DEVTO_USER_URL}${username}`);
  const devtoUserRes = await devtoUserResponse.json();
  const { data: hnUserData } = await apolloClient.query({
    query: GET_USER_BY_USERNAME,
    variables: {
      username,
    },
  });
  const githubUser = cleanAttrs(githubUserRes);
  const hashnodeUser = cleanAttrs(hnUserData.user);
  const devtoUser = cleanAttrs(devtoUserRes);
  const user = await fullfillUser({
    username,
    github: githubUser,
    hashnode: hashnodeUser,
    devto: devtoUser,
  });
  return user;
};

export default buildUser;
