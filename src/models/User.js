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
    maxlength: [40, 'Name cannot be more than 40 characters'],
  },
  email: {
    type: String,
  },
  shortBio: {
    type: String,
    maxlength: [120, 'Short Bio cannot be more than 120 characters'],
  },
  largeBio: {
    type: String,
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
  created: {
    type: Date,
    default: Date.now,
  },
  updated: { type: Date },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
