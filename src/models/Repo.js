import { Schema } from 'mongoose';

export const RepoSchema = new Schema({
  id: { type: String },
  name: { type: String },
  order: { type: Number },
  description: { type: String },
  stargazers_count: { type: Number, default: 0 },
  forks_count: { type: Number, default: 0 },
  html_url: { type: String },
  homepage: { type: String },
  language: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});
