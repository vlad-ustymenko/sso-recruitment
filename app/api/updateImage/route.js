import { connectDB } from "../../../lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const oldImageUrl = formData.get("oldImageUrl");
    const newImage = formData.get("newImage");

    const { db } = await connectDB();
    const collection = db.collection("vacancies");

    const publicId = `vacancies/${
      oldImageUrl.split("/").slice(-1)[0].split(".")[0]
    }`;

    cloudinary.uploader.destroy(publicId);

    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dffb9mawi/image/upload";
    const uploadPreset = "sso-recruitment";
    const uploadImage = async (file) => {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", uploadPreset);
      uploadData.append("folder", "vacancies");

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: uploadData,
      });
      const result = await response.json();

      if (!response.ok)
        throw new Error(result.error?.message || "Помилка завантаження");

      return result.secure_url;
    };
    const [newImageUrl] = await Promise.all([uploadImage(newImage)]);

    return new NextResponse(
      JSON.stringify({
        message: "Зображення успішно оновлено",
        newImageUrl: newImageUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Помилка при оновленні зображення" }),
      { status: 500 }
    );
  }
}
