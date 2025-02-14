export async function POST(req) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("file1");
    const image2 = formData.get("file2");
    const image3 = formData.get("file3");

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

    // Завантажуємо всі три зображення
    const [image1_url, image2_url, image3_url] = await Promise.all([
      uploadImage(image1),
      uploadImage(image2),
      uploadImage(image3),
    ]);

    return new Response(
      JSON.stringify({ image1_url, image2_url, image3_url }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
