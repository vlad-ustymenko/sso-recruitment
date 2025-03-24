"use client";
import { Button } from "@/shared/components/Button/Button";
import { useVacanciesContext } from "@/context/VacanciesContext";
import { useState } from "react";

import styles from "./VacanciesList.module.css";
import BrFromater from "@/shared/components/BrFormater/BrFromater";

const VacanciesList = () => {
  const [rank, setRank] = useState("all");
  const [vacancyType, setVacancyType] = useState("front");
  const { vacancies } = useVacanciesContext();
  const activeVacancies = vacancies.filter(
    (vacancy) => vacancy.isActive === true
  );

  const types = [
    { name: "Бойові", value: "front" },
    { name: "Тилові", value: "rear" },
  ];

  const ranks = [
    { name: "Всі", value: "all" },
    { name: "Солдатські посади", value: "soldier" },
    { name: "Сержантські посади", value: "sergeant" },
    { name: "Офіцерські посади", value: "officer" },
  ];

  const filteredVacancies = activeVacancies.filter((vacancy) => {
    const matchesRank = rank === "all" || vacancy.rank === rank;
    const matchesType = vacancy.type === vacancyType;
    return matchesRank && matchesType;
  });

  return (
    <div className={styles.vacanciesContainer}>
      <h2 className={styles.title}>В кому ми зацікавлені?</h2>

      <div className={styles.filterButtons}>
        <div className={styles.typeButtonsWrapper}>
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setVacancyType(type.value)}
              className={
                type.value === vacancyType
                  ? `${styles.active} ${styles.button}`
                  : styles.button
              }
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className={styles.rankButtonsWrapper}>
          {ranks.map((rankItem) => (
            <div key={rankItem.value} className={styles.radioWrapper}>
              <input
                type="radio"
                id={rankItem.value}
                name="rank"
                value={rankItem.value}
                checked={rank === rankItem.value}
                onChange={() => setRank(rankItem.value)}
                className={styles.radioInput}
              />
              <label htmlFor={rankItem.value} className={styles.radioLabel}>
                {rankItem.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <ul className={styles.vacancyList}>
        {filteredVacancies.length === 0 ? (
          <h2 className={styles.noVacancies}>
            Упс, зараз таких вакансій немає
          </h2>
        ) : (
          filteredVacancies.map((vacancy) => (
            <li key={vacancy._id} className={styles.vacancyWrapper}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${vacancy.smallImage})`,
                  width: "100%",
                  height: "300px",
                }}
              >
                <div
                  className={styles.icon}
                  style={{
                    backgroundImage: `url(${vacancy.iconImage})`,
                  }}
                ></div>
              </div>
              <div className={styles.vacancyContent}>
                <h2 className={styles.vacancyTitle}>{vacancy.title}</h2>
                <p className={styles.vacancyCredo}>
                  <BrFromater text={vacancy.credo} />
                </p>
                <Button
                  title="Детальніше"
                  pageID={vacancy.slug}
                  vacancyButton
                ></Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VacanciesList;
