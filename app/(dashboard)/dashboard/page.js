"use client";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { useVacanciesContext } from "@/context/VacanciesContext";
import Container from "@/shared/components/Container/Container";
import styles from "./page.module.css";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import Link from "next/link";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { vacancies, updateVacancyStatus, deleteVacancy } =
    useVacanciesContext();

  useEffect(() => {
    const getToken = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token");
      }
      return null;
    };

    const token = getToken();

    if (!token) {
      redirect("/login");
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) throw new Error("Недійсний токен");
      setIsAuthenticated(true);
    } catch (error) {
      redirect("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const handleToggleActive = (id, currentStatus) => {
    updateVacancyStatus(id, !currentStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю вакансію?")) {
      deleteVacancy(id);
    }
  };
  return (
    <Container>
      <div className={styles.container}>
        <Link href="/dashboard/create" className={styles.createButton}>
          Створити вакансію
        </Link>
        <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("token");
            document.location.reload();
          }}
        >
          Вийти
        </button>
        <h1 className={styles.title}>Вакансії</h1>

        <ul className={styles.vacanciesContainer}>
          {vacancies.map((vacancy) => (
            <li
              className={styles.vacancyWrapper}
              key={vacancy._id}
              style={{
                backgroundColor: vacancy.isActive ? "white" : "#ededed",
                color: vacancy.isActive ? "black" : "gray",
              }}
            >
              <div
                className={styles.vacancyImage}
                style={{
                  backgroundImage: `url(${vacancy.smallImage})`,
                  filter: vacancy.isActive ? "blur(0)" : "blur(3px)",
                }}
              >
                <div
                  className={styles.vacancyIcon}
                  style={{ backgroundImage: `url(${vacancy.iconImage})` }}
                ></div>
              </div>
              <div className={styles.vacancyContent}>
                <div className={styles.vacancyTitle}>{vacancy.title}</div>
                <BrFromater
                  className={styles.vacancyDescription}
                  text={vacancy.description}
                ></BrFromater>
              </div>
              <div className={styles.buttonsWrapper}>
                <button
                  className={styles.button}
                  onClick={() =>
                    handleToggleActive(vacancy._id, vacancy.isActive)
                  }
                  style={{
                    backgroundColor: "#1B946E",
                  }}
                >
                  {vacancy.isActive ? "Деактивувати" : "Активувати"}
                </button>

                <Link
                  href={`dashboard/edit/${vacancy._id}`}
                  className={styles.button}
                  style={{
                    backgroundColor: "gray",
                  }}
                >
                  Редагувати
                </Link>

                <button
                  className={styles.button}
                  style={{ backgroundColor: "#f49292" }}
                  onClick={() => handleDelete(vacancy._id)}
                >
                  Видалити
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
