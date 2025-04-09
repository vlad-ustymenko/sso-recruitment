import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const oldImageUrl = formData.get("oldImageUrl");
    const newImage = formData.get("newImage");

    if (!newImage || typeof oldImageUrl !== "string") {
      return new NextResponse(JSON.stringify({ message: "Некоректні дані" }), {
        status: 400,
      });
    }

    let folderName;
    if (oldImageUrl.includes("/bigImages/")) {
      folderName = "bigImages";
    } else if (oldImageUrl.includes("/smallImages/")) {
      folderName = "smallImages";
    } else if (oldImageUrl.includes("/iconImages/")) {
      folderName = "iconImages";
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Невідомий тип зображення" }),
        { status: 400 }
      );
    }

    // Видалення старого зображення з новим шляхом (в uploads)
    const oldFilename = oldImageUrl.split("/").pop();
    const oldImagePath = path.join(
      process.cwd(),
      "uploads",
      "images",
      "vacancies",
      folderName,
      oldFilename
    );

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    // Збереження нового зображення
    const buffer = Buffer.from(await newImage.arrayBuffer());
    const newFilename = `${uuidv4()}.webp`; // Генеруємо новий унікальний файл за допомогою uuidv4
    const newImagePath = path.join(
      process.cwd(),
      "uploads",
      "images",
      "vacancies",
      folderName,
      newFilename
    );

    fs.writeFileSync(newImagePath, buffer);

    const newImageUrl = `/api/uploads/images/vacancies/${folderName}/${newFilename}`;

    return new NextResponse(
      JSON.stringify({
        message: "Зображення успішно оновлено",
        newImageUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка оновлення зображення:", error);
    return new NextResponse(
      JSON.stringify({ message: "Помилка при оновленні зображення" }),
      { status: 500 }
    );
  }
}
