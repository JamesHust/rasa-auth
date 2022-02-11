import * as mongoose from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: UtilsService.generateRandomString(10),
    },
    phone_number: {
      type: String,
      required: true,
      default: '',
    },
    roles: {
      type: [String],
      default: ['user'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
