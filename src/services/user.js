import fetchAPI from '@lib/fetch-api';
import { IS_GENERATOR } from '@lib/constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const updateUser = (username = '', input = {}) => {
  return new Promise((resolve, reject) => {
    fetchAPI(`/user/${username}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(input),
      throwOnHTTPError: IS_GENERATOR,
    })
      .then((res) => {
        if (res.success) {
          console.log('User updated');
        }
        resolve(res);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const upsertUser = (body) => {
  return new Promise((resolve, reject) => {
    fetchAPI('/user', {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
      throwOnHTTPError: IS_GENERATOR,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
