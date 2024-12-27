import mongoose from "mongoose";

export const connectionDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongosetion');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
