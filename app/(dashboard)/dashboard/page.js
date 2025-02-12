"use client";
import React, { useState } from "react";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    credo: "",
    type: "",
    rank: "",
    responsibilities: "",
    guarantees: "",
    militaryUnit: "",
    image1: null,
    image2: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { image1, image2, ...otherFields } = formData;
    const formUploadData = new FormData();
    formUploadData.append("file1", image1);
    formUploadData.append("file2", image2);

    try {
      // Завантажуємо зображення на Cloudinary
      const imageResponse = await fetch("/api/uploadImage", {
        method: "POST",
        body: formUploadData,
      });
      const imageResult = await imageResponse.json();
      if (imageResponse.ok) {
        // Отримуємо URL зображень
        const { image1_url, image2_url } = imageResult;

        // Після отримання URL, створюємо об'єкт для відправки в MongoDB
        const dataToSend = {
          ...otherFields,
          bigImage: image1_url,
          smallImage: image2_url,
        };

        // Відправляємо дані на сервер для збереження в MongoDB
        const saveResponse = await fetch("/api/vacancies", {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        });

        const saveResult = await saveResponse.json();
        if (saveResponse.ok) {
          console.log("Вакансія успішно додана в MongoDB:", saveResult);
        } else {
          console.error(
            "Помилка при збереженні вакансії в MongoDB",
            saveResult
          );
        }
      } else {
        console.error("Помилка при завантаженні зображень", imageResult);
      }
    } catch (error) {
      console.error("Помилка завантаження:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="subTitle"
        value={formData.subTitle}
        onChange={handleChange}
        placeholder="Subtitle"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="credo"
        value={formData.credo}
        onChange={handleChange}
        placeholder="Credo"
        required
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
        required
      />
      <input
        type="text"
        name="rank"
        value={formData.rank}
        onChange={handleChange}
        placeholder="Rank"
        required
      />
      <textarea
        name="responsibilities"
        value={formData.responsibilities}
        onChange={handleChange}
        placeholder="Responsibilities"
        required
      />
      <textarea
        name="guarantees"
        value={formData.guarantees}
        onChange={handleChange}
        placeholder="Guarantees"
        required
      />
      <input
        type="text"
        name="militaryUnit"
        value={formData.militaryUnit}
        onChange={handleChange}
        placeholder="Military Unit"
        required
      />
      <input type="file" name="image1" onChange={handleImageChange} />
      <input type="file" name="image2" onChange={handleImageChange} />
      <button type="submit">Додати вакансію</button>
    </form>
  );
}
