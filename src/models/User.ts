import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  email: string;
  password: string;
}

const User = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", User);
