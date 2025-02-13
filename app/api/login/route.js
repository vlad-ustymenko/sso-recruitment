import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const { db } = await connectDB();
    const user = await db.collection("user").findOne({ login: username });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
