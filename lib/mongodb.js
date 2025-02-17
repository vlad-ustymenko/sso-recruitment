import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Змінна середовища MONGODB_URI не визначена");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    return mongoose.connection;
  } catch (error) {
    throw new Error("Помилка підключення до бази даних");
  }
}
