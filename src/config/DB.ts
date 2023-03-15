import mongoose from "mongoose";
import environmentVariables from "./environmentVariable";

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(
      environmentVariables.MONGODB_STRING_LOCAL
    );
    console.log(`DB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConfig;
