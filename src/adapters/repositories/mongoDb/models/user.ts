import { model, Schema } from "mongoose";

export type userModel = {
  id: string;
  userName: string;
  email: string;
  password: string;
  created: number;
  updated?: number;
};

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userName: {
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
  },
  created: {
    type: Number,
    required: true,
  },
  updated: {
    type: Number,
    required: false,
  },
});

export const UserModel = model("User", userSchema);
