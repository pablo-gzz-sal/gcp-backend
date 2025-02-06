import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  email: string;
  password: string;
}

const User = new Schema<any>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", User);
