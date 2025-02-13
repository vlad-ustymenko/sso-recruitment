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
      console.log("✅ Вже підключено до MongoDB");
      return mongoose.connection;
    }

    console.log("🔹 Підключення до MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Підключено до MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ Помилка підключення до MongoDB:", error);
    throw new Error("Помилка підключення до бази даних");
  }
}
