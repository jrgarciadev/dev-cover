import { Schema } from 'mongoose';

export const LinksSchema = new Schema({
  key: { type: String },
  value: { type: String },
});
