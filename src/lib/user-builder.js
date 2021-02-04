import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';
import { cleanAttrs, getStringByCriteria, cleanGithubUrl } from '@utils';
import { getGithubReadmeURL, getNameUser } from '@utils/user-mapping';
import { get, chunk, first, orderBy, size, includes, isEmpty } from 'lodash';
import fetchAPI from './fetch-api';
import {
  GITHUB_API_URL,
  GITHUB_USER_URL,
  API_URL,
  DEVTO_USER_URL,
  DEVTO_ARTICLES_URL,
  IS_GENERATOR,
} from './constants';

const stringSimilarity = require('string-similarity');

const usrname = process.env.NEXT_PUBLIC_USERNAME;
const isLivePortfolio = usrname && !IS_GENERATOR;

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

const getIsGithubRateLimited = async () => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/rate_limit`);
    const limit = await response.json();
    if (limit.resources.core.remaining < 1) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getDevcoverUserData = async (username) => {
  try {
    const response = await fetch(`${API_URL}user/${username}`);
    if (response.status === 404 || response.status === 403) {
      return null;
    }
    const responseData = await response.json();
    if (!responseData.success) {
      return null;
    }
    const user = responseData.data;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const markAsActivePortfoio = (user) => {
  const input = {
    username: user.username,
    name: user.name,
    email: user.email,
    shortBio: user.shortBio,
    largeBio: user.largeBio,
    ga: user.ga,
    isHireable: user.isHireable,
    portfolioActive: true,
    primaryColor: user.primaryColor,
  };
  fetchAPI(`/user/${user.username}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(input),
    throwOnHTTPError: true,
  })
    .then((res) => {
      if (res.success) {
        console.log('User updated');
      }
    })
    .catch((err) => {
      console.error(err);
    });
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
      githubUsername = cleanGithubUrl(get(hashnode, 'socialMedia.github'));
    } else if (get(devto, 'github_username')) {
      githubUsername = get(devto, 'github_username');
    }
    user.github.login = githubUsername;
  }
  if (user.github.login) {
    if (
      get(hashnode, 'socialMedia.github') !== user.github.login &&
      !isEmpty(get(hashnode, 'socialMedia.github'))
    ) {
      user.github.login = cleanGithubUrl(get(hashnode, 'socialMedia.github'));
    }
    const githubUserRes = await fetch(`${GITHUB_USER_URL}${user.github.login}`);
    const githubUserData = await githubUserRes.json();
    const githubReadmeData = await fetchUserReadme(user.github.login);
    const githubReposData = await getReposData(user.github.login);
    const githubLimited = await getIsGithubRateLimited();
    user.github = cleanAttrs(githubUserData);
    user.github.limited = githubLimited;
    user.github.readme = githubReadmeData;
    user.github.repos = githubReposData;
    user.hasRepos = size(githubReposData) > 0;
  }
  const userBioArray = [
    get(user, 'devto.summary'),
    get(user, 'github.bio'),
    get(user, 'hashnode.tagline'),
  ];
  const userData = await getDevcoverUserData(username);
  user.primaryColor = get(userData, 'primaryColor') || null;
  user.name = get(userData, 'name') || getNameUser(user) || '';
  user.email = get(userData, 'email') || null;
  user.username = username;
  user.ga = get(userData, 'ga') || null;
  user.shortBio = get(userData, 'shortBio') || getStringByCriteria(userBioArray, 'shortest') || '';
  user.largeBio = get(userData, 'largeBio') || getStringByCriteria(userBioArray) || '';
  user.hasGithub = !isEmpty(get(user, 'github.login'));
  user.hasHashnode = !isEmpty(user, 'hashnode.name');
  user.hasDevto = get(user, 'devto.status') !== 404;
  user.hasReadme =
    !isEmpty(user, 'github.readme') &&
    !includes(get(user, 'github.readme'), 'Invalid') &&
    !includes(get(user, 'github.readme'), '404');
  if (isLivePortfolio) {
    markAsActivePortfoio(user);
  }
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
