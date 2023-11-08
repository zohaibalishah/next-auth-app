import mongoose from 'mongoose';

export async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
  } catch (error) {
    console.log('Something goes wrong!');
    console.log(error);
  }
}
