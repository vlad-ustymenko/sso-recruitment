import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import fs from "fs";
import path from "path";

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

    const deleteImageFromLocal = (imageUrl, folder) => {
      if (!imageUrl) return;

      const fileName = imageUrl.split("/").pop();
      const filePath = path.join(
        process.cwd(),
        "uploads", // Тепер працюємо з папкою uploads
        "images",
        "vacancies",
        folder,
        fileName
      );

      try {
        // Видалення файлу з локальної папки
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Файл ${filePath} успішно видалено`);
        } else {
          console.log(`Файл ${filePath} не знайдений`);
        }
      } catch (error) {
        console.error(`Помилка при видаленні файлу ${filePath}:`, error);
      }
    };

    // Видаляємо зображення з локальних папок
    await Promise.all([
      deleteImageFromLocal(vacancy.bigImage, "bigImages"),
      deleteImageFromLocal(vacancy.smallImage, "smallImages"),
      deleteImageFromLocal(vacancy.iconImage, "iconImages"),
    ]);

    // Видалення вакансії з бази даних
    await Vacancy.findByIdAndDelete(id);

    return NextResponse.json({ message: "Вакансію видалено" }, { status: 200 });
  } catch (error) {
    console.error("Помилка видалення вакансії:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
