import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';
import {
  cleanAttrs,
  getStringByCriteria,
  selectFirstWithValue,
  areSimilarStrings,
  cleanGithubUrl,
  mapArrayOrder,
  toLowerCase,
} from '@utils';
import {
  getGithubReadmeURL,
  getNameUser,
  getHashnodePubDomain,
  getAvatar,
  getKeysMapped,
  extractSocialNetworks,
  getUserFavicon,
} from '@utils/user-mapping';
import { get, map, chunk, first, orderBy, union, size, includes, isEmpty, truncate } from 'lodash';
import { updateUser, upsertUser } from '@services/user';
import {
  GITHUB_API_URL,
  GITHUB_USER_URL,
  API_URL,
  DEVTO_USER_URL,
  DEVTO_ARTICLES_URL,
  IS_PORTFOLIO,
} from './constants';

const fetchUserReadme = async (username) => {
  const branches = ['main', 'master'];
  const names = ['README.md', 'Readme.md', 'readme.md'];
  let readmeFound = false;
  let githubReadmeData = null;
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const branch of branches) {
      // eslint-disable-next-line no-restricted-syntax
      for (const fileName of names) {
        if (!readmeFound) {
          // eslint-disable-next-line no-await-in-loop
          const githubReadmeRes = await fetch(getGithubReadmeURL(username, branch, fileName));
          // eslint-disable-next-line no-await-in-loop
          githubReadmeData = await githubReadmeRes.text();
          readmeFound = !githubReadmeData.includes('404');
        }
      }
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
      devtoPosts = map(
        first(chunk(orderBy(devtoPosts, ['positive_reactions_count'], ['desc']), 4)),
        (post) => {
          return {
            provider: 'devto',
            id: post.id,
            title: post.title || '',
            url: post.url || '#',
            cover: post.cover_image || '',
            likes: post.positive_reactions_count || 0,
            description: post.description || '',
            comments: post.comments_count || 0,
            created: post.published_timestamp || '',
          };
        },
      );
    }
  }

  if (user.hasHashnode) {
    hashnodePosts = map(
      first(chunk(orderBy(user.hashnode.publication.posts, ['totalReactions'], ['desc']), 4)),
      (post) => {
        return {
          provider: 'hashnode',
          id: post._id,
          title: post.title || '',
          slug: post.slug || '',
          url: post.url || getHashnodePubDomain(user, post.slug) || '#',
          cover: post.coverImage || '',
          likes: post.totalReactions || 0,
          description: post.brief || '',
          comments: post.replyCount + post.responseCount || 0,
          featured: !isEmpty(post.dateFeatured),
          created: post.dateAdded || '',
        };
      },
    );
  }
  if (hashnodePosts.length > 0 && devtoPosts.length > 0) {
    if (devtoPosts.length > hashnodePosts.length) {
      devtoPosts.forEach((post) => {
        hashnodePosts.forEach((hnPost) => {
          const similar = areSimilarStrings(hnPost.title, post.title);
          if (similar) {
            hashnodePosts = hashnodePosts.filter((p) => p.id !== hnPost.id);
          }
        });
      });
    } else {
      hashnodePosts.forEach((hnPost) => {
        devtoPosts.forEach((post) => {
          const similar = areSimilarStrings(hnPost.title, post.title);
          if (similar) {
            devtoPosts = devtoPosts.filter((p) => p.id !== post.id);
          }
        });
      });
    }
    return mapArrayOrder(union(devtoPosts, hashnodePosts));
  }
  if (hashnodePosts.length > 0) {
    return mapArrayOrder(hashnodePosts);
  }
  if (devtoPosts.length > 0) {
    return mapArrayOrder(devtoPosts);
  }
  return [];
};

export const getReposData = async (username) => {
  try {
    const response = await fetch(`${GITHUB_USER_URL}${username}/repos?per_page=100`);
    if (response.status === 404 || response.status === 403) {
      return [];
    }
    const repos = await response.json();
    const orderedRepos = orderBy(repos, ['stargazers_count'], ['desc']);
    return orderedRepos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getIsGithubRateLimited = async (showLimit = false) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/rate_limit`);
    const limit = await response.json();
    if (showLimit) {
      return limit;
    }
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
    const response = await fetch(`${API_URL}/user/${username}`);
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

const markAsActivePortfoio = async (user) => {
  const input = {
    portfolioActive: true,
  };
  await updateUser(get(user, 'username'), input);
};

const applyValidations = (user) => {
  const githubName = get(user, 'github.name');
  const devtoName = get(user, 'devto.name');
  const hashnodeName = get(user, 'hashnode.name');
  if (!isEmpty(githubName) && !isEmpty(devtoName) && !areSimilarStrings(githubName, devtoName)) {
    // eslint-disable-next-line no-param-reassign
    delete user.devto;
  }
  if (
    !isEmpty(githubName) &&
    !isEmpty(hashnodeName) &&
    !areSimilarStrings(githubName, hashnodeName, 0.5)
  ) {
    // eslint-disable-next-line no-param-reassign
    delete user.hashnode;
  }
  return user;
};

const getDevcoverUser = async (username, baseUser = {}, userBioArray = [], isPreview = false) => {
  const user = { ...baseUser };
  const userData = await getDevcoverUserData(username);
  user.primaryColor = get(userData, 'primaryColor', null);
  user.avatar = isPreview ? getAvatar(userData) : getAvatar(user);
  user.favicon = isPreview ? get(userData, 'favicon') : getUserFavicon(user);
  user.name = get(userData, 'name') || getNameUser(user) || '';
  user.readme = get(userData, 'readme', get(user, 'github.readme', ''));
  user.email = get(userData, 'email', null);
  user.username = toLowerCase(username);
  user.ga = get(userData, 'ga', null);
  user.repos = selectFirstWithValue(get(userData, 'repos'), get(user, 'github.repos', []));
  user.shortBio =
    truncate(get(userData, 'shortBio', getStringByCriteria(userBioArray, 'shortest')), {
      length: 120,
    }) || '';
  user.largeBio = get(userData, 'largeBio', getStringByCriteria(userBioArray)) || '';
  user.hasGithub = isPreview
    ? get(userData, 'hasGithub', false)
    : !isEmpty(get(user, 'github.login'));
  user.hasRepos = size(user.repos) > 0;
  user.hasHashnode = isPreview
    ? get(userData, 'hasHashnode', false)
    : !isEmpty(get(user, 'hashnode.name'));
  user.hasDevto = isPreview
    ? get(userData, 'hasDevto', false)
    : !isEmpty(get(user, 'devto.username'));
  user.hasReadme =
    !isEmpty(get(user, 'readme')) &&
    !includes(get(user, 'readme'), 'Invalid') &&
    !includes(get(user, 'readme'), '404');
  user.showAbout = get(userData, 'showAbout', user.hasReadme);
  user.showRepos = get(userData, 'showRepos', user.hasRepos);
  user.links = isPreview ? get(userData, 'links') : getKeysMapped(extractSocialNetworks(user));
  try {
    if (IS_PORTFOLIO || isPreview) {
      user.posts = get(userData, 'posts');
    } else {
      user.posts = await buildPosts(user);
    }
    user.hasPosts = user.posts && user.posts.length > 0;
    user.showBlog = get(userData, 'showBlog', user.hasPosts);
  } catch (error) {
    console.error(error);
    user.hasPosts = false;
    user.posts = null;
  }
  if (IS_PORTFOLIO || isPreview) {
    await markAsActivePortfoio(user);
  } else {
    await upsertUser(cleanAttrs(user, ['github', 'hashnode', 'devto']));
  }
  return user;
};

const fullfillUser = async ({ username, github = {}, hashnode = {}, devto = {} }) => {
  let user = {
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
  if (get(user, 'github.login')) {
    if (
      get(hashnode, 'socialMedia.github') !== get(user, 'github.login') &&
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
  }

  user = applyValidations(user);

  const userBioArray = [
    get(user, 'devto.summary'),
    get(user, 'github.bio'),
    get(user, 'hashnode.tagline'),
  ];

  const userData = await getDevcoverUser(username, user, userBioArray);
  return userData;
};

const buildUser = async (params) => {
  const apolloClient = initializeApollo();
  let user = {};
  const { username, isPreview = false } = params;

  if (isPreview) {
    user = await getDevcoverUser(username, {}, [], true);
    return user;
  }

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
  user = await fullfillUser({
    username,
    github: githubUser,
    hashnode: hashnodeUser,
    devto: devtoUser,
  });
  return user;
};

export default buildUser;
