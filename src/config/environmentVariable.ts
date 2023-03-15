import dotenv from "dotenv";
dotenv.config();

const environmentVariables = {
  PORT: process.env.PORT!,
  MONGODB_STRING_LOCAL: process.env.MONGODB_STRING_LOCAL!,
};

export default environmentVariables;
