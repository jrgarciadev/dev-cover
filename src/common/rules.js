const required = 'This field is required';
module.exports = {
  name: {
    required,
    maxLength: {
      value: 40,
      message: 'Maximum length allowed',
    },
    minLength: {
      value: 3,
      message: `This field must have at least 3 characters`,
    },
  },
  shortBio: {
    maxLength: {
      value: 120,
      message: 'Maximum length allowed',
    },
    minLength: {
      value: 3,
      message: `This field must have at least 3 characters`,
    },
  },
  readme: {
    minLength: {
      value: 3,
      message: `This field must have at least 3 characters`,
    },
  },
  largeBio: {
    required,
    maxLength: {
      value: 256,
      message: 'Maximum length allowed',
    },
    minLength: {
      value: 10,
      message: `This field must have at least 10 characters`,
    },
  },
  username: {
    required,
    minLength: {
      value: 3,
      message: `This field must have at least 3 characters`,
    },
    pattern: {
      value: /^[a-z0-9_-]{3,26}$/i,
      message: 'Invalid username',
    },
  },
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address',
    },
  },
  ga: {
    minLength: {
      value: 8,
      message: `This field must have at least 8 characters`,
    },
    maxLength: {
      value: 120,
      message: 'Maximum length allowed',
    },
  },
};
