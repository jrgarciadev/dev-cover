import { initializeApollo } from '@lib/apollo-client';
import { GET_USER_BY_USERNAME } from '@graphql/queries/hashnode/user';
import { cleanAttrs } from '@utils';
import { getGithubReadmeURL } from '@utils/user-mapping';
import { get, has, replace } from 'lodash';
import { GITHUB_URL, GITHUB_USER_URL, DEVTO_USER_URL } from './constants';

const fetchUserReadme = async (username) => {
  let githubReadmeRes = await fetch(getGithubReadmeURL(username, 'main'));
  let githubReadmeData = await githubReadmeRes.text();
  if (githubReadmeData.includes('404')) {
    githubReadmeRes = await fetch(getGithubReadmeURL(username, 'master'));
    githubReadmeData = await githubReadmeRes.text();
  }
  return githubReadmeData;
};

const fullfillUser = async ({ github = {}, hashnode = {}, devto = {} }) => {
  const user = {
    github,
    hashnode,
    devto,
  };
  if (!github.login) {
    let githubUsername = '';
    if (devto.github_username) {
      githubUsername = devto.github_username;
    } else if (hashnode?.socialMedia?.github) {
      githubUsername = replace(hashnode?.socialMedia?.github, GITHUB_URL, '');
    }
    user.github.login = githubUsername;
  }
  if (user.github.login) {
    const githubUserRes = await fetch(`${GITHUB_USER_URL}${user.github.login}`);
    const githubUserData = await githubUserRes.json();
    const githubReadmeData = await fetchUserReadme(user.github.login);
    user.github = cleanAttrs(githubUserData);
    user.github.readme = githubReadmeData;
  }
  user.hasGithub = has(user, 'github.login');
  user.hasGithub = get(user, 'github.login');
  user.hasDevto = get(user, 'devto.status') !== 404;
  user.hasReadme = has(user, 'github.readme') && !get(user, 'github.readme').includes('404');

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
  const user = await fullfillUser({ github: githubUser, hashnode: hashnodeUser, devto: devtoUser });
  user.username = username;
  return user;
};

export default buildUser;
