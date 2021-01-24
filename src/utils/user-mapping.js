import { get } from 'lodash';

export const extractSocialNetworks = (user) => {
  if (!user) return '';
  const socialMedia = { github: '', linkedin: '', hashnode: '', devto: '', twitter: '' };
  if (user.socialMedia) {
    socialMedia.github =
      get(user, 'socialMedia.github') || `https://github.com/${get(user, 'github_username')}`;
    socialMedia.linkedin = get(user, 'socialMedia.linkedin');
    socialMedia.twitter = get(user, 'socialMedia.twitter');
    socialMedia.hashnode = `https://hashnode.com/@${get(user, 'username')}`;
    if (user.hasDevto) {
      socialMedia.devto = `https://dev.to/${get(user, 'username')}`;
    }
  }
  return socialMedia;
};

export const getLiksMapped = (user) => {
  const socialMedia = extractSocialNetworks(user);
  return Object.keys(socialMedia)
    .map((key) => {
      if (socialMedia[key] && key !== '__typename') {
        return { key, value: socialMedia[key] };
      }
      return null;
    })
    .filter(Boolean);
};

export const getSocialURL = (obj) => {
  if (!obj.key || !obj.value) return '';
  return obj.value;
};
