import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";

export async function GET(req, context) {
  await connectDB();
  const { params } = context;
  const { id } = await params;

  try {
    const vacancy = await Vacancy.findOne({ slug: id });
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
    const updatedVacancy = await Vacancy.findOneAndUpdate({ slug: id }, data, {
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
