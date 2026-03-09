import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("DB connected Successfully");
  } catch (error) {
    console.error("FULL ERROR ↓↓↓");
    console.error(error);
  }
};

export default dbconnect;