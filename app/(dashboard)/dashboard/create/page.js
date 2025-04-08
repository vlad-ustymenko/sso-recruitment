"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVacanciesContext } from "@/context/VacanciesContext";
import jwt from "jsonwebtoken";
import styles from "./page.module.css";

export default function Create() {
  const { fetchVacancies } = useVacanciesContext();
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subTitle: "",
    description: "",
    credo: "",
    type: "",
    rank: "",
    responsibilities: "",
    guarantees: "",
    militaryUnit: "",
    metaTitle: "",
    metaDescription: "",
    image1: null,
    image2: null,
    image3: null,
    isActive: true,
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) throw new Error("Недійсний токен");
      setIsAuthenticated(true);
    } catch (error) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (isSending) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isSending]);

  const transliterate = (text) => {
    const map = {
      а: "a",
      б: "b",
      в: "v",
      г: "h",
      ґ: "g",
      д: "d",
      е: "e",
      є: "ye",
      ж: "zh",
      з: "z",
      и: "y",
      і: "i",
      ї: "yi",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ь: "",
      ю: "yu",
      я: "ya",
      "'": "",
      "’": "",
    };

    return text
      .toLowerCase()
      .split("")
      .map((char) => map[char] || char)
      .join("")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "title") {
        updatedData.slug = transliterate(value);
      }

      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreviews((prev) => ({ ...prev, [name]: imageUrl }));
      setFormData((prevData) => ({ ...prevData, [name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (!formData.image1 || !formData.image2 || !formData.image3) {
      alert("Будь ласка, додайте всі три зображення!");
      setIsSending(false);
      return;
    }
    const { image1, image2, image3, ...otherFields } = formData;
    const formUploadData = new FormData();
    formUploadData.append("file1", image1);
    formUploadData.append("file2", image2);
    formUploadData.append("file3", image3);

    try {
      const imageResponse = await fetch("/api/uploadLocalImage", {
        method: "POST",
        body: formUploadData,
      });
      const imageResult = await imageResponse.json();
      if (imageResponse.ok) {
        const { image1_url, image2_url, image3_url } = imageResult;
        const dataToSend = {
          ...otherFields,
          bigImage: image1_url,
          smallImage: image2_url,
          iconImage: image3_url,
          isActive: formData.isActive,
        };

        const saveResponse = await fetch("/api/vacancies", {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        });

        const saveResult = await saveResponse.json();
        if (saveResponse.ok) {
          console.log("Вакансія успішно додана в MongoDB:", saveResult);
        } else {
          console.error("Помилка при збереженні вакансії", saveResult);
        }
      } else {
        console.error("Помилка при завантаженні зображень", imageResult);
      }
    } catch (error) {
      console.error("Помилка завантаження:", error);
    } finally {
      Object.values(imagePreviews).forEach(
        (url) => url && URL.revokeObjectURL(url)
      );
      setImagePreviews({
        image1: null,
        image2: null,
        image3: null,
      });
      setFormData({
        title: "",
        slug: "",
        subTitle: "",
        description: "",
        credo: "",
        type: "",
        rank: "",
        responsibilities: "",
        guarantees: "",
        militaryUnit: "",
        metaTitle: "",
        metaDescription: "",
        image1: null,
        image2: null,
        image3: null,
        isActive: true,
      });
      setIsSending(false);
      alert("Вакансія успішно додана!");
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => {
          fetchVacancies();
          router.push("/dashboard");
        }}
      >
        Назад
      </button>
      {isSending && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <h2 className={styles.title}>Додати Вакансію</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { name: "title", label: "Назва вакансії" },
          { name: "slug", label: "Slug" },
          { name: "subTitle", label: "Підзаголовок", textarea: true },
          { name: "description", label: "Опис вакансії", textarea: true },
          { name: "credo", label: "Кредо", textarea: true },
          {
            name: "responsibilities",
            label: "Основні обов’язки",
            textarea: true,
          },
          { name: "guarantees", label: "Гарантії", textarea: true },
          { name: "militaryUnit", label: "Військова частина" },
          { name: "metaTitle", label: "Meta Title" },
          { name: "metaDescription", label: "Meta Description" },
        ].map(({ name, label, textarea }) => (
          <div key={name} className={styles.inputGroup}>
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            {textarea ? (
              <>
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                  placeholder={
                    ["subTitle", "credo", "description"].includes(name)
                      ? "Приклад переносу тексту&\nТекст перенесено"
                      : "*Пункт 1\n*Пункт 2\n*Пункт 3"
                  }
                />
                {["subTitle", "credo", "description"].includes(name) && (
                  <p className={styles.subTitle}>
                    Щоб текст на сайті переносився на новий рядок,
                    <span style={{ color: "#00875C", margin: "0 5px" }}>
                      використовуйте символ "&" в місці де необхідний перенос.
                    </span>
                    На сайті він відображатися не буде
                  </p>
                )}
                {["responsibilities", "guarantees"].includes(name) && (
                  <p className={styles.subTitle}>
                    Щоб список на сайті відображався коректно, кожен пункт
                    <span style={{ color: "#00875C", margin: "0 5px" }}>
                      починайте з символа "*"
                    </span>
                    На сайті він відображатися не буде
                  </p>
                )}
              </>
            ) : (
              <input
                id={name}
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className={styles.input}
              />
            )}
          </div>
        ))}

        {[
          {
            name: "type",
            label: "Категорія війск",
            options: [
              { display: "Фронт", value: "front" },
              { display: "Тил", value: "rear" },
            ],
          },
          {
            name: "rank",
            label: "Типи посад",
            options: [
              { display: "Солдат", value: "soldier" },
              { display: "Сержант", value: "sergeant" },
              { display: "Офіцер", value: "officer" },
            ],
          },
        ].map(({ name, label, options }) => (
          <div key={name} className={styles.inputGroup}>
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            <div className={styles.selectWrapper}>
              <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="" disabled>
                  Оберіть {label.toLowerCase()}
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                isActive: e.target.checked,
              }))
            }
          />
          <label htmlFor="isActive" className={styles.label}>
            Вакансія активна
          </label>
        </div>

        <div className={styles.imageUploadContainer}>
          {["image1", "image2", "image3"].map((imageKey, index) => (
            <div key={index} className={styles.imageInputWrapper}>
              <label className={styles.label}>{`${
                imageKey === "image1"
                  ? "Велике 1280x380"
                  : imageKey === "image2"
                  ? "Мініатюра 420x240"
                  : "Іконка 35x35"
              }`}</label>
              <label className={styles.fileInput}>
                {imagePreviews[imageKey] ? (
                  <img
                    src={imagePreviews[imageKey]}
                    alt={`Прев’ю ${imageKey}`}
                    className={styles.imagePreview}
                  />
                ) : (
                  "Формат .webp"
                )}
                <input
                  type="file"
                  name={imageKey}
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={isSending}
          style={{ backgroundColor: isSending ? "gray" : "#00875C" }}
        >
          {isSending ? "Завантаження..." : "Створити вакансію"}
        </button>
      </form>
    </div>
  );
}
