import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID не вказано" }, { status: 400 });
    }

    const vacancy = await Vacancy.findById(id);
    if (!vacancy) {
      return NextResponse.json(
        { error: "Вакансію не знайдено" },
        { status: 404 }
      );
    }

    const deleteImageFromCloudinary = async (imageUrl) => {
      if (!imageUrl) return;

      const publicId = `vacancies/${
        imageUrl.split("/").slice(-1)[0].split(".")[0]
      }`;

      try {
        const result = cloudinary.uploader.destroy(publicId);
        console.log(`Результат видалення ${publicId}:`, result);
      } catch (error) {
        console.error(`Помилка видалення ${publicId}:`, error);
      }
    };

    await Promise.all([
      deleteImageFromCloudinary(vacancy.bigImage),
      deleteImageFromCloudinary(vacancy.smallImage),
      deleteImageFromCloudinary(vacancy.iconImage),
    ]);

    await Vacancy.findByIdAndDelete(id);

    return NextResponse.json({ message: "Вакансію видалено" }, { status: 200 });
  } catch (error) {
    console.error("Помилка видалення вакансії:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
``;
