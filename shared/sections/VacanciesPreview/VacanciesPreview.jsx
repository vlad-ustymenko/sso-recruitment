"use client";

import Container from "@/shared/components/Container/Container";
import styles from "./VacanciesPreview.module.css";
import React, { useState } from "react";
import VacancyCarousel from "@/shared/components/VacancieCarousel/VacancieCarousel";

const VacanciesPrewiev = () => {
  const front = [
    {
      id: 1,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/solder1.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 2,
      title: "Діловод відділення персоналу",
      image: "/images/solder2.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 3,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/solder3.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 4,
      title: "Діловод відділення персоналу",
      image: "/images/scout1.jpg",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 5,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/clerk.webp",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
  ];

  const back = [
    {
      id: 1,
      title: "Діловод відділення персоналу",
      image: "/images/scout1.jpg",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 2,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/clerk.webp",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 3,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/solder1.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 4,
      title: "Діловод відділення персоналу",
      image: "/images/solder2.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 5,
      title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
      image: "/images/solder3.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
  ];

  const [vacanciesList, setVacanciesList] = useState(front);
  const [vacanciesType, setVacanciesType] = useState("front");

  return (
    <>
      <Container>
        <h2 className={styles.title}>Кого ми шукаємо</h2>
        <div className={styles.buttonWrapper}>
          <div
            className={`${styles.button} ${
              vacanciesType === "front" && styles.active
            }`}
            onClick={() => {
              setVacanciesList(front);
              setVacanciesType("front");
            }}
          >
            Бойові
          </div>
          <div
            className={`${styles.button} ${
              vacanciesType === "back" && styles.active
            }`}
            onClick={() => {
              setVacanciesList(back);
              setVacanciesType("back");
            }}
          >
            Тилові
          </div>
        </div>
      </Container>
      <VacancyCarousel vacanciesList={vacanciesList} />
    </>
  );
};

export default VacanciesPrewiev;
