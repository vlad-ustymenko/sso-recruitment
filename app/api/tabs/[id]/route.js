import { connectDB } from "@/lib/mongodb";
import Tab from "@/models/Tab";

export async function GET(req, context) {
  await connectDB();
  const { params } = context;
  const { id } = await params;

  try {
    const tab = await Tab.findById(id);
    if (!tab)
      return Response.json({ message: "Таб не знайдено" }, { status: 404 });

    return Response.json(tab, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Помилка отримання таба" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();

  try {
    const updatedTab = await Tab.findByIdAndUpdate(id, data, {
      new: true,
    });
    return Response.json(updatedTab, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Помилка оновлення таба" },
      { status: 500 }
    );
  }
}
