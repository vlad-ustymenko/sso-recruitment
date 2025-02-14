"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import jwt from "jsonwebtoken";
import { useVacanciesContext } from "@/context/VacanciesContext";
import styles from "./page.module.css";
import Link from "next/link";

export default function EditVacancy() {
  const { fetchVacancies } = useVacanciesContext();

  const router = useRouter();
  const { id } = useParams();
  const [oldInfo, setOldInfo] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

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
    image3: null,
    isActive: true,
  });

  const [showImageInputs, setShowImageInputs] = useState(false);

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
    } catch (error) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchVacancy = async () => {
      const res = await fetch(`/api/vacancies/${id}`);
      const data = await res.json();
      setOldInfo(data);
      if (res.ok) {
        setFormData({
          ...data,
          image1: null,
          image2: null,
          image3: null,
        });

        setImagePreviews({
          image1: data.bigImage || null,
          image2: data.smallImage || null,
          image3: data.iconImage || null,
        });
      }
    };

    fetchVacancy();
  }, [id]);

  useEffect(() => {
    if (isSending) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isSending]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

    const { image1, image2, image3, ...otherFields } = formData;

    let dataToSend = {
      ...otherFields,
      bigImage: oldInfo.bigImage,
      smallImage: oldInfo.smallImage,
      iconImage: oldInfo.iconImage,
    };

 
    if (formData.image1 !== oldInfo.bigImage && formData.image1 !== null) {
      const bigImageData = new FormData();
      bigImageData.append("oldImageUrl", oldInfo.bigImage);
      bigImageData.append("newImage", formData.image1);

      try {
        const response = await fetch("/api/updateImage", {
          method: "PUT",
          body: bigImageData,
        });
        const result = await response.json();
        if (response.ok) {
          dataToSend = {
            ...dataToSend,
            bigImage: result.newImageUrl,
          };
        }
      } catch (error) {
        console.error("Помилка при завантаженні зображення:", error);
      }
    }

    if (formData.image2 !== oldInfo.smallImage && formData.image2 !== null) {
      const smallImageData = new FormData();
      smallImageData.append("oldImageUrl", oldInfo.smallImage);
      smallImageData.append("newImage", formData.image2);

      try {
        const response = await fetch("/api/updateImage", {
          method: "PUT",
          body: smallImageData,
        });
        const result = await response.json();
        if (response.ok) {
          dataToSend = {
            ...dataToSend,
            smallImage: result.newImageUrl, 
          };
        }
      } catch (error) {
        console.error("Помилка при завантаженні зображення:", error);
      }
    }

   
    if (formData.image3 !== oldInfo.iconImage && formData.image3 !== null) {
      const iconImageData = new FormData();
      iconImageData.append("oldImageUrl", oldInfo.iconImage);
      iconImageData.append("newImage", formData.image3);

      try {
        const response = await fetch("/api/updateImage", {
          method: "PUT",
          body: iconImageData,
        });
        const result = await response.json();
        if (response.ok) {
          dataToSend = {
            ...dataToSend,
            iconImage: result.newImageUrl, 
          };
        }
      } catch (error) {
        console.error("Помилка при завантаженні зображення:", error);
      }
    }

   
    try {
      const saveResponse = await fetch(`/api/vacancies/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      const saveResult = await saveResponse.json();
      if (saveResponse.ok) {
        console.log("Вакансія успішно оновлена:", saveResult);
        alert("Вакансія успішно оновлена!");
        router.push("/dashboard");
      } else {
        console.error("Помилка при оновленні вакансії", saveResult);
      }
    } catch (error) {
      console.error("Помилка оновлення:", error);
    } finally {
      Object.values(imagePreviews).forEach(
        (url) => url && URL.revokeObjectURL(url)
      );
      fetchVacancies();
      setIsSending(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backButton}>
        Назад
      </Link>
      {isSending && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <h2 className={styles.title}>
        Редагування вакансії
        <br />
        {oldInfo.title}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { name: "title", label: "Назва вакансії" },
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
                  ? "Велике 1280x690"
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
          {isSending ? "Завантаження..." : "Редагувати вакансію"}
        </button>
      </form>
    </div>
  );
}
