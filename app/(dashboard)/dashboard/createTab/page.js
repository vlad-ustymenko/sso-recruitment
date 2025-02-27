"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTabsContext } from "@/context/TabsContext";

import jwt from "jsonwebtoken";
import styles from "./page.module.css";

export default function CreateTab() {
  const router = useRouter();
  const { fetchTabs } = useTabsContext();

  const [isSending, setIsSending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const saveResponse = await fetch("/api/tabs", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const saveResult = await saveResponse.json();
      if (saveResponse.ok) {
        console.log("Вакансія успішно додана в MongoDB:", saveResult);
      } else {
        console.error("Помилка при збереженні вакансії", saveResult);
      }
    } catch (error) {
      console.error("Помилка завантаження:", error);
    } finally {
      setFormData({
        title: "",
        content: "",
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
          fetchTabs();
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
      <h2 className={styles.title}>Додати Таб</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { name: "title", label: "Назва таба" },
          { name: "content", label: "Контент", textarea: true },
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
                    ["content"].includes(name)
                      ? "Приклад переносу тексту&\nТекст перенесено"
                      : "*Пункт 1\n*Пункт 2\n*Пункт 3"
                  }
                />
                {["content"].includes(name) && (
                  <p className={styles.subTitle}>
                    Щоб текст на сайті переносився на новий рядок,
                    <span style={{ color: "#00875C", margin: "0 5px" }}>
                      використовуйте символ "&" в місці де необхідний перенос.
                    </span>
                    <br />
                    Щоб створити список,
                    <span style={{ color: "#00875C", margin: "0 5px" }}>
                      використовуйте символ "*" перед кожним пунктом списку.
                    </span>
                    <br />
                    Щоб перенести текст з відступом,{" "}
                    <span style={{ color: "#00875C", margin: "0 5px" }}>
                      використовуйте символ "&&" в місці де необхідний перенос з
                      відступом.
                    </span>
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

        <button
          type="submit"
          className={styles.button}
          disabled={isSending}
          style={{ backgroundColor: isSending ? "gray" : "#00875C" }}
        >
          {isSending ? "Завантаження..." : "Створити таб"}
        </button>
      </form>
    </div>
  );
}
