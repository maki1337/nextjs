import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  console.log("MongoDB initializing ...");

  if (connected) {
    console.log("mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log("MongoDB connected ...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
