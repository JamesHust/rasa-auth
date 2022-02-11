import { Schema } from 'mongoose';

export const BotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
