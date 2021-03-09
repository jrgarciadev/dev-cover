import mongoose, { Schema } from 'mongoose';
import { RepoSchema } from './Repo';
import { PostSchema } from './Post';
import { LinksSchema } from './Links';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [1, 'Name must have at least 1 characters'],
  },
  name: {
    type: String,
    maxlength: [40, 'Name cannot be more than 40 characters'],
  },
  avatar: {
    type: String,
  },
  favicon: {
    type: String,
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
  readme: {
    type: String,
  },
  showAbout: {
    type: Boolean,
    default: true,
  },
  showBlog: {
    type: Boolean,
    default: true,
  },
  showRepos: {
    type: Boolean,
    default: true,
  },
  primaryColor: {
    type: String,
    default: '#1ee0e0',
  },
  isHireable: {
    type: Boolean,
    default: false,
  },
  hasGithub: {
    type: Boolean,
    default: false,
  },
  hasHashnode: {
    type: Boolean,
    default: false,
  },
  hasDevto: {
    type: Boolean,
    default: false,
  },
  portfolioActive: {
    type: Boolean,
    default: false,
  },
  repos: [RepoSchema],
  posts: [PostSchema],
  links: [LinksSchema],
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
