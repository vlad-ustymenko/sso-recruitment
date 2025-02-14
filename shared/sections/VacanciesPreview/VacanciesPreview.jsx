"use client";

import Container from "@/shared/components/Container/Container";
import styles from "./VacanciesPreview.module.css";
import React, { useState } from "react";
import VacancyCarousel from "@/shared/components/VacancieCarousel/VacancieCarousel";
import { useVacanciesContext } from "@/context/VacanciesContext";

const VacanciesPrewiev = ({ title, filter }) => {
  const { vacancies, isLoading, error } = useVacanciesContext();
  const [vacanciesType, setVacanciesType] = useState("front");

  const activeVacancies = vacancies.filter((vacancy) => vacancy.isActive);
  const filteredVacancies = activeVacancies
    .filter((vacancy) => vacancy.type === vacanciesType)
    .slice(-6);

  return (
    <>
      <Container>
        <h2 className={styles.title}>{title}</h2>
        {filter && (
          <div className={styles.buttonWrapper}>
            <div
              className={`${styles.button} ${
                vacanciesType === "front" && styles.active
              }`}
              onClick={() => setVacanciesType("front")}
            >
              Бойові
            </div>
            <div
              className={`${styles.button} ${
                vacanciesType === "rear" && styles.active
              }`}
              onClick={() => setVacanciesType("rear")}
            >
              Тилові
            </div>
          </div>
        )}
      </Container>

      {isLoading && <p>Завантаження вакансій...</p>}
      {!isLoading && !error && vacancies.length > 0 && (
        <VacancyCarousel
          vacanciesList={filter ? filteredVacancies : activeVacancies.slice(-6)}
        />
      )}
    </>
  );
};

export default VacanciesPrewiev;
