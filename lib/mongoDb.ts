import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectToDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL || "", {
      dbName: "CineHub",
    });
    isConnected = true;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
