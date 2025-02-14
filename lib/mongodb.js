import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Змінна середовища MONGODB_URI не визначена");
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ Помилка підключення до MongoDB:", error);
    throw new Error("Помилка підключення до бази даних");
  }
}
