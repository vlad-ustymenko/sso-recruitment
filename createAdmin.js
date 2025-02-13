import bcrypt from "bcrypt";
import User from "./models/User.js";
import { connectDB } from "./lib/mongodb.js";

const createAdmin = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash("cPRF43h32x#", 10);

  const newAdmin = new User({
    login: "mainUserAdmin",
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log("Адміністратор створений!");
  process.exit();
};

createAdmin();
