import fetchAPI from '@lib/fetch-api';

export const updateUser = (username = '', input = {}) => {
  return new Promise((resolve, reject) => {
    fetchAPI(`/user/${username}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(input),
      throwOnHTTPError: true,
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
      throwOnHTTPError: true,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
