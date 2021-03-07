import { get, has, replace, isEmpty } from 'lodash';
import { IS_GENERATOR, GITHUB_README_URL, MAIN_SITE_URL, AVATAR_GEN_URL } from '@lib/constants';
import theme from '@themes/common';
import { getPageFavicon } from '@utils';

export const extractSocialNetworks = (user) => {
  if (!user) return '';
  const socialMedia = { github: '', linkedin: '', hashnode: '', devto: '', twitter: '' };
  if (user.hasHashnode) {
    socialMedia.linkedin = get(user, 'hashnode.socialMedia.linkedin');
    socialMedia.twitter = get(user, 'hashnode.socialMedia.twitter');
    socialMedia.hashnode = `https://hashnode.com/@${get(user, 'username')}`;
  }
  if (user?.hasDevto) {
    socialMedia.devto = `https://dev.to/${get(user, 'username')}`;
  }
  if (user?.hasGithub) {
    socialMedia.github = get(user, 'github.html_url');
  }
  return socialMedia;
};

export const getKeysMapped = (keys) => {
  if (!keys) return {};
  return Object.keys(keys)
    .map((key) => {
      if (keys[key] && key !== '__typename') {
        return { key, value: keys[key] };
      }
      return null;
    })
    .filter(Boolean);
};

export const getObjValue = (obj) => {
  if (!obj || !obj.key || !obj.value) return '';
  return obj.value;
};

export const getNavLinks = (user) => {
  const navLinks = {
    about: '',
    blog: '',
    projects: '',
    contact: '',
  };
  if (user?.posts && user?.showBlog && user.posts.length > 0) {
    navLinks.blog = IS_GENERATOR ? `/portfolio/${user?.username}#blog` : '#blog';
  }
  if (user?.hasReadme && user?.showAbout && user?.username) {
    navLinks.about = IS_GENERATOR ? `/portfolio/${user?.username}#about` : '#about';
  }
  if (user?.hasRepos && user?.showRepos) {
    navLinks.projects = IS_GENERATOR ? `/portfolio/${user?.username}#projects` : '#projects';
  }
  if (!isEmpty(user.email) || user.isHireable) {
    navLinks.contact = IS_GENERATOR ? `/portfolio/${user?.username}#contact` : '#contact';
  }
  return navLinks;
};

export const getHeroLink = (user) => {
  if (!isEmpty(get(user, 'username'))) {
    return IS_GENERATOR ? `/portfolio/${user?.username}#hero` : '#hero';
  }
  return '/';
};

export const getNameUser = (user) => {
  if (!user) return '';
  return user?.github?.name || user?.hashnode?.name || user?.devto?.name;
};

export const getAvatar = (user) => {
  if (!user) return '';
  return get(
    user,
    'avatar',
    get(
      user,
      'github.avatar_url',
      get(user, 'hashnode.photo', get(user, 'devto.profile_image', '/default-avatar.png')),
    ),
  );
};

export const isEnabledUser = (user) => {
  if (isEmpty(user)) return false;
  if (!user.hasGithub && !user.hasHashnode) {
    return false;
  }
  return true;
};

export const purgeUserReadme = (readme) => {
  if (typeof window === 'undefined') {
    return '';
  }
  const disallowElements = ['img'];
  const container = document.createElement('span');
  container.innerHTML = readme;
  disallowElements.forEach((el) =>
    Array.from(container.querySelectorAll(el)).forEach((e) => {
      if (el !== 'a') {
        if (el === 'img' && !e?.src?.includes('github-readme-stats')) {
          return e.remove();
        }
      }
      if (e.hasChildNodes()) {
        return e.remove();
      }
      return e;
    }),
  );
  return container.innerHTML;
};

export const getGithubReadmeURL = (username, branch = 'main', fileName = 'README.md') => {
  return `${GITHUB_README_URL}${username}/${username}/${branch}/${fileName}`;
};

export const getUserFavicon = (user) => {
  const userPrimaryColor = replace(theme?.brand?.primary, '#', '');
  if (has(user, 'hashnode.publicationDomain')) {
    return getPageFavicon(get(user, 'hashnode.publicationDomain'));
  }
  if (has(user, 'hashnode.socialMedia.website')) {
    return getPageFavicon(get(user, 'hashnode.socialMedia.website'));
  }
  if (has(user, 'devto.website_url')) {
    return getPageFavicon(get(user, 'devto.website_url'));
  }
  return `${AVATAR_GEN_URL}${user.name}.svg?background=%23${userPrimaryColor}`;
};

export const getHeadData = ({ isPortfolio, user }) => {
  const title = 'Devcover | Easiest way to generate a dev portfolio';
  const head = {
    title,
    icon: `${MAIN_SITE_URL}/favicon.ico`,
    twitter_site: '@jrgarciadev',
    twitter_image: `${MAIN_SITE_URL}/twitter-image-devcover.jpg`,
    og_site_name: title,
    og_title: title,
    og_url: MAIN_SITE_URL,
    og_image: `${MAIN_SITE_URL}/twitter-image-devcover.jpg`,
    description: '🌐 Get and publish your developer portfolio with just your username',
    keywords: 'Portfolio, Developer, Generator, Vercel, Hashnode',
  };
  if (!isEmpty(user) && isPortfolio) {
    const userImage =
      user?.github?.avatar_url || user?.hashnode?.photo || user?.devto?.profile_image;
    const userIcon = user.favicon || getUserFavicon(user);
    const userTitle = `${user.name} ${user.shortBio && `| ${user.shortBio}`}`;
    head.title = userTitle;
    head.icon = userIcon;
    head.twitter_site =
      user?.devto?.twitter_username ||
      user?.github?.twitter_username ||
      user?.hashnode?.socialMedia?.twitter ||
      '';
    head.twitter_image = userImage;
    head.og_site_name = userTitle;
    head.og_title = userTitle;
    head.og_url = '';
    head.og_image = userImage;
    head.description = user.largeBio;
    head.keywords = '';
  }
  return head;
};

export const getHashnodePubDomain = (user, slug = '') => {
  if (!isEmpty(get(user, 'hashnode.publicationDomain'))) {
    return `https://${user?.hashnode?.publicationDomain}/${slug}`;
  }
  return `https://${get(user, 'username')}.hashnode.dev/${slug}`;
};
