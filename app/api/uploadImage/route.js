export async function POST(req) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("file1");
    const image2 = formData.get("file2");
    const image3 = formData.get("file3");

    // Перевірка наявності файлів
    if (!image1 || !image2 || !image3) {
      return new Response(
        JSON.stringify({ error: "Всі файли повинні бути надані!" }),
        { status: 400 }
      );
    }

    // Завантаження зображення 1 на Cloudinary
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dffb9mawi/image/upload";
    const cloudinaryPreset = "sso-recruitment";
    const cloudName = "dffb9mawi";

    const uploadFormData1 = new FormData();
    uploadFormData1.append("file", image1);
    uploadFormData1.append("upload_preset", cloudinaryPreset);
    uploadFormData1.append("cloud_name", cloudName);

    const response1 = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadFormData1,
    });

    const result1 = await response1.json();
    if (!response1.ok) {
      throw new Error(result1.error.message);
    }

    // Завантаження зображення 2 на Cloudinary
    const uploadFormData2 = new FormData();
    uploadFormData2.append("file", image2);
    uploadFormData2.append("upload_preset", cloudinaryPreset);
    uploadFormData2.append("cloud_name", cloudName);

    const response2 = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadFormData2,
    });

    const result2 = await response2.json();
    if (!response2.ok) {
      throw new Error(result2.error.message);
    }

    // Завантаження зображення 3 на Cloudinary
    const uploadFormData3 = new FormData();
    uploadFormData3.append("file", image3);
    uploadFormData3.append("upload_preset", cloudinaryPreset);
    uploadFormData3.append("cloud_name", cloudName);

    const response3 = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadFormData3,
    });

    const result3 = await response3.json();
    if (!response3.ok) {
      throw new Error(result3.error.message);
    }

    return new Response(
      JSON.stringify({
        image1_url: result1.secure_url,
        image2_url: result2.secure_url,
        image3_url: result3.secure_url,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
