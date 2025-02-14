import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const vacancy = await Vacancy.findById(id);
    if (!vacancy)
      return Response.json(
        { message: "Вакансія не знайдена" },
        { status: 404 }
      );

    return Response.json(vacancy, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Помилка отримання вакансії" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();

  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(id, data, {
      new: true,
    });
    return Response.json(updatedVacancy, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Помилка оновлення вакансії" },
      { status: 500 }
    );
  }
}
