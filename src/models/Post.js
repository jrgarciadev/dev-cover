import { Schema } from 'mongoose';

export const PostSchema = new Schema({
  id: { type: String },
  order: { type: Number },
  title: { type: String },
  url: { type: String },
  slug: { type: String },
  cover: { type: String },
  provider: { type: String },
  description: { type: String },
  likes: { type: Number },
  comments: { type: Number },
  featured: { type: Boolean },
  created: { type: String },
  updated: { type: Date },
});
