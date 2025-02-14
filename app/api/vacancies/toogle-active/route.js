import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy"; // Переконайся, що шлях правильний

export async function POST(req) {
  try {
    await connectDB();
    const { id, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID не вказано" }, { status: 400 });
    }

    const result = await Vacancy.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Вакансію не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Статус оновлено", vacancy: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка оновлення вакансії:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
