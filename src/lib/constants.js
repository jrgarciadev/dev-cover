import { isEmpty } from 'lodash';

export const NAV_SCROLL_HEIGHT = 90;
export const NAV_SCROLL_HEIGHT_MOBILE = 70;
export const NAV_HEIGHT = 90;
export const NAV_DELAY = 1000;
export const HERO_TITLE_DELAY = 1000;
export const LOADER_DELAY = 500;
export const PROJECTS_GRID_LIMIT = 6;
export const GA_TRACKING_ID = 'G-GBP7Y41Z1Q';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_GENERATOR = process.env.NEXT_PUBLIC_GENERATOR_MODE === 'true';
export const IS_PORTFOLIO = !IS_GENERATOR && !isEmpty(process.env.NEXT_PUBLIC_USERNAME);
export const MAIN_SITE_URL = 'https://devcover.me/';
export const API_URL = IS_PRODUCTION ? `${MAIN_SITE_URL}api` : 'http://localhost:3000/api';
export const GITHUB_URL = 'https://github.com/';
export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_USER_URL = `${GITHUB_API_URL}/users/`;
export const GITHUB_README_URL = 'https://raw.githubusercontent.com/';
export const DEVTO_USER_URL = 'https://dev.to/api/users/by_username?url=';
export const DEVTO_ARTICLES_URL = 'https://dev.to/api/articles?username=';
export const HASHNODE_URL = 'https://api.hashnode.com/';
export const AVATAR_GEN_URL = 'https://avatars.dicebear.com/4.5/api/initials/';
export const FAVICON_URL = 'https://icons.duckduckgo.com/ip3/';

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};
