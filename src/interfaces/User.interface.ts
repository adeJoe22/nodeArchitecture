import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IUserDocument extends Document, IUser {
  comparePassword(password: string): Promise<boolean>;
}
