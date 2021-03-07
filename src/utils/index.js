/* eslint-disable no-return-assign */
import { FAVICON_URL } from '@lib/constants';
import { replace, map } from 'lodash';

const stringSimilarity = require('string-similarity');

/* eslint-disable no-restricted-syntax */
export const tint = (hex, amount) => {
  try {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    const getSingle = (number) => parseInt((number * (100 + amount)) / 100, 10);

    R = getSingle(R);
    G = getSingle(G);
    B = getSingle(B);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const getDouble = (number) =>
      number.toString(16).length === 1 ? `0${number.toString(16)}` : number.toString(16);

    const RR = getDouble(R);
    const GG = getDouble(G);
    const BB = getDouble(B);

    return `#${RR}${GG}${BB}`;
  } catch (error) {
    console.error(error.message);
    return '';
  }
};

export const hexa = (hex, alpha, isCssVar) => {
  let hexCopy = hex;
  try {
    if (isCssVar && typeof document !== 'undefined') {
      hexCopy = hexCopy.replace('var(', '').replace(')', '');
      hexCopy = document.documentElement.style.getPropertyValue(hexCopy);
    }
    const r = parseInt(hexCopy.slice(1, 3), 16);
    const g = parseInt(hexCopy.slice(3, 5), 16);
    const b = parseInt(hexCopy.slice(5, 7), 16);

    if (alpha >= 0) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    return '';
  }
};

export const getStringByCriteria = (strings = [], criteria = 'largest') => {
  if (!strings || !Array.isArray(strings)) {
    return '';
  }
  const filteredStrings = strings.filter(Boolean);
  let value = filteredStrings[0];
  if (strings.length === 1) {
    return value;
  }
  filteredStrings.forEach((s) => {
    if (s && (criteria === 'largest' ? s.length > value.length : s.length < value.length)) {
      value = s;
    }
  });
  return value;
};

export const cleanAttrs = (obj, propArr = []) => {
  const objClone = { ...obj };
  for (const propName in objClone) {
    if (objClone[propName] === null || objClone[propName] === undefined) {
      delete objClone[propName];
    }
  }
  propArr.forEach((propName) => {
    delete objClone[propName];
  });
  return objClone;
};

export const areSimilarStrings = (s1, s2, percentage = 0.8) =>
  stringSimilarity.compareTwoStrings(s1, s2) > percentage;

export const isIos = () => {
  /* istanbul ignore next */
  if (typeof window === 'undefined' || !window.navigator) return false;
  return /iP(ad|hone|od)/.test(window.navigator.platform);
};

export const formatPostDate = (date) => {
  if (!date) return '';
  const formattedDate = new Date(date).toLocaleDateString(
    {},
    { timeZone: 'UTC', month: 'long', day: '2-digit', year: 'numeric' },
  );
  const sp = formattedDate.split(' ');
  return `${sp[1]} ${sp[0]}, ${sp[2]}`;
};

export const getPageFavicon = (domain) => {
  if (!domain) return '';
  if (typeof domain !== 'string') {
    return '';
  }
  if (domain.includes('https://')) {
    replace(domain, 'https://', '');
  }
  if (domain.includes('http://')) {
    replace(domain, 'http://', '');
  }
  return `${FAVICON_URL}${domain}.ico`;
};

export const cleanGithubUrl = (domain) => {
  if (!domain) return '';
  if (typeof domain !== 'string') {
    return '';
  }
  if (domain.includes('https://')) {
    return replace(domain, 'https://github.com/', '');
  }
  if (domain.includes('http://')) {
    return replace(domain, 'http://github.com/', '');
  }
  return domain;
};

export const getRandomId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const mapArrayOrder = (array) => {
  return map(array, (item, index) => {
    return { ...item, order: index };
  });
};

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  result = mapArrayOrder(result);
  return result;
};

export const selectFirstWithValue = (arr1 = [], arr2 = []) => {
  if (arr1 && arr1.length > 0) return arr1;
  return arr2;
};

export const toLowerCase = (value) => {
  if (!value || value.length < 1) return value;
  return value.trim().toLowerCase();
};
