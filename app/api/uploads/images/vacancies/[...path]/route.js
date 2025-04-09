import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const filePathParts = params.path;

  if (!filePathParts || filePathParts.length !== 2) {
    return NextResponse.json({ message: "Invalid path" }, { status: 400 });
  }

  const [subfolder, filename] = filePathParts;

  const fullPath = path.join(
    process.cwd(),
    "uploads",
    "images",
    "vacancies",
    subfolder,
    filename
  );

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  const fileBuffer = await fs.promises.readFile(fullPath);
  const ext = path.extname(filename).toLowerCase();

  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000", // опціонально
    },
  });
}
