"use client";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { useVacanciesContext } from "@/context/VacanciesContext";
import Container from "@/shared/components/Container/Container";
import styles from "./page.module.css";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { vacancies } = useVacanciesContext();

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
  console.log(vacancies);

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Ти залогінений, можеш додавати вакансії!</p>
      <div></div>
      <ul className={styles.vacanciesContainer}>
        {vacancies.map((vacancy) => (
          <li className={styles.vacancyWrapper} key={vacancy._id}>
            <div
              className={styles.vacancyImage}
              style={{ backgroundImage: `url(${vacancy.smallImage})` }}
            >
              <div
                className={styles.vacancyIcon}
                style={{ backgroundImage: `url(${vacancy.iconImage})` }}
              ></div>
            </div>
            <div className={styles.vacancyContent}>
              <div className={styles.vacancyTitle}>{vacancy.title}</div>
              <div className={styles.vacancyDescription}>
                {vacancy.description}
              </div>
              <div className={styles.vacancyMilitaryUnit}>
                {vacancy.militaryUnit}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
