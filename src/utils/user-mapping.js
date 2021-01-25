import { get } from 'lodash';
import { IS_GENERATOR } from '@lib/constants';

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
    // projects: '/#projects',
    // contact: '/#contact',
  };
  if (user?.hashnode?.publicationDomain) {
    navLinks.blog = `https://${user.hashnode.publicationDomain}`;
  } else if (user?.hasHashnode) {
    navLinks.blog = `https://hashnode.com/@${get(user, 'username')}`;
  } else if (user?.hasDevto) {
    navLinks.blog = `https://dev.to/${get(user, 'username')}`;
  }
  if (user?.hasReadme && user?.username) {
    navLinks.about = IS_GENERATOR ? `/portfolio/${user?.username}/#about` : '/#about';
  }
  return navLinks;
};

export const getNameUser = (user) => {
  if (!user) return '';
  return user?.github?.name || user?.hashnode?.name || user?.devto?.name;
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
        return e.remove();
      }
      if (e.hasChildNodes()) {
        return e.remove();
      }
      return e;
    }),
  );
  return container.innerHTML;
};
