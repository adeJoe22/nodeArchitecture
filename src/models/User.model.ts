import { Schema, model } from "mongoose";
import { IUserDocument } from "../interfaces/User.interface";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

const userSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      required: [true, "PLease enter your email"],
      validate: [isEmail, "PLease enter a valid email"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: [true, "Please enter a password"] },
    confirmPassword: {
      type: String,
      required: [true, "Please enter a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      message: "You must either, be a user, an admin or a manager",
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware for hashing password
userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) next();
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  user.confirmPassword = user.password;
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const UserModel = model<IUserDocument>("User", userSchema);
export default UserModel;
