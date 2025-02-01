"use client";

import Container from "@/shared/components/Container/Container";
import styles from "./VacanciesPreview.module.css";
import React, { useState } from "react";
import VacancyCarousel from "@/shared/components/VacancieCarousel/VacancieCarousel";

const VacanciesPrewiev = () => {
  const front = [
    {
      id: 1,
      title: "1",
      image: "/images/solder1.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 2,
      title: "2",
      image: "/images/solder2.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 3,
      title: "3",
      image: "/images/solder3.png",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 4,
      title: "4",
      image: "/images/scout1.jpg",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 5,
      title: "5",
      image: "/images/clerk.webp",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
    {
      id: 6,
      title: "6",
      image: "/images/scout2.jpg",
      unit: "66 ОМБр ім. князя Мстислава Хороброго",
    },
  ];

  const back = [
    {
      id: 1,
      title: "6",
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

  const [vacanciesList, setVacanciesList] = useState(front);

  return (
    <>
      <Container>
        <h2 className={styles.title}>Кого ми шукаємо</h2>
        <div className={styles.buttonWrapper}>
          <div
            className={styles.button}
            onClick={() => setVacanciesList(front)}
          >
            Front
          </div>
          <div className={styles.button} onClick={() => setVacanciesList(back)}>
            back
          </div>
        </div>
      </Container>
      <VacancyCarousel vacanciesList={vacanciesList} />
    </>
  );
};

export default VacanciesPrewiev;
