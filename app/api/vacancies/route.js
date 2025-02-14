import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const vacancy = new Vacancy(data);
    await vacancy.save();
    return NextResponse.json(
      { message: "Вакансія додана", vacancy },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const vacancies = await Vacancy.find();
    return NextResponse.json(vacancies, { status: 200 });
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

    const deletedVacancy = await Vacancy.findByIdAndDelete(id);

    if (!deletedVacancy) {
      return NextResponse.json(
        { error: "Вакансія не знайдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Вакансія видалена", deletedVacancy },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при видаленні вакансії:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
