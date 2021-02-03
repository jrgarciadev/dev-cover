import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [1, 'Name must have at least 1 characters'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [3, 'Name must have at least 10 characters'],
    maxlength: [40, 'Name cannot be more than 40 characters'],
  },
  email: {
    type: String,
    minlength: [3, 'Email must have at least 10 characters'],
  },
  shortBio: {
    type: String,
    minlength: [3, 'Short Bio must have at least 10 characters'],
    maxlength: [120, 'Short Bio cannot be more than 120 characters'],
  },
  largeBio: {
    type: String,
    minlength: [10, 'Large Bio must have at least 10 characters'],
    maxlength: [256, 'Large Bio cannot be more than 120 characters'],
  },
  primaryColor: {
    type: String,
    default: '#1ee0e0',
  },
  isHireable: {
    type: Boolean,
    default: false,
  },
  portfolioActive: {
    type: Boolean,
    default: false,
  },
  /* Google Analytics code */
  ga: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
