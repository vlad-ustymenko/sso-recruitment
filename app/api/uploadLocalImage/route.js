import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const image1 = formData.get("file1");
    const image2 = formData.get("file2");
    const image3 = formData.get("file3");

    const saveImage = async (file, subfolder) => {
      if (!file || typeof file === "string") return null;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.type.split("/")[1];
      const fileName = `${uuidv4()}.${ext}`;

      const uploadDir = path.join(
        process.cwd(),
        "uploads",
        "images",
        "vacancies",
        subfolder
      );

      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      return `/api/uploads/images/vacancies/${subfolder}/${fileName}`;
    };

    const [image1_url, image2_url, image3_url] = await Promise.all([
      saveImage(image1, "bigImages"),
      saveImage(image2, "smallImages"),
      saveImage(image3, "iconImages"),
    ]);

    return new Response(
      JSON.stringify({ image1_url, image2_url, image3_url }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
