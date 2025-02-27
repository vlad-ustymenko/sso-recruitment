import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tab from "@/models/Tab";

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID не вказано" }, { status: 400 });
    }

    const tab = await Tab.findById(id);
    if (!tab) {
      return NextResponse.json({ error: "Таб не знайдено" }, { status: 404 });
    }

    await Tab.findByIdAndDelete(id);

    return NextResponse.json({ message: "Таб видалено" }, { status: 200 });
  } catch (error) {
    console.error("Помилка видалення таба:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
``;
