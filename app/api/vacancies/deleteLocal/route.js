import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import fs from "fs";
import path from "path";
// import { revalidatePath } from "next/cache";

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
        "uploads",
        "images",
        "vacancies",
        folder,
        fileName
      );

      try {
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

    await Promise.all([
      deleteImageFromLocal(vacancy.bigImage, "bigImages"),
      deleteImageFromLocal(vacancy.smallImage, "smallImages"),
      deleteImageFromLocal(vacancy.iconImage, "iconImages"),
    ]);

    await Vacancy.findByIdAndDelete(id);

    // revalidatePath(`/vacancies/${vacancy.slug}`);
    // revalidatePath("/vacancies");

    return NextResponse.json({ message: "Вакансію видалено" }, { status: 200 });
  } catch (error) {
    console.error("Помилка видалення вакансії:", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
