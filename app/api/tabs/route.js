import { connectDB } from "@/lib/mongodb";
import Tab from "@/models/Tab";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const tab = new Tab(data);
    await tab.save();
    return NextResponse.json({ message: "Таб додано", tab }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const tabs = await Tab.find();
    return NextResponse.json(tabs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID обов'язковий" }, { status: 400 });
    }

    const deletedTab = await Tab.findByIdAndDelete(id);

    if (!deletedTab) {
      return NextResponse.json({ error: "Таб не знайдено" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Таб видалено", deletedTab },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при видаленні таба:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
