"use client";
import { Button } from "@/shared/components/Button/Button";
import { useVacanciesContext } from "@/context/VacanciesContext";

import styles from "./VacanciesList.module.css";
import BrFromater from "@/shared/components/BrFormater/BrFromater";

const VacanciesList = () => {
  const { vacancies } = useVacanciesContext();
  return (
    <div>
      <h2 className={styles.title}>В кому ми зацікавлені?</h2>
      <div>
        {vacancies.length === 0 ? (
          <p>Немає вакансій</p>
        ) : (
          vacancies.map((vacancy) => (
            <div key={vacancy._id} className={styles.vacancyWrapper}>
              <div className={styles.vacancyItemWrapper}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${vacancy.smallImage})`,
                    width: "100%",
                    height: "300px",
                  }}
                ></div>
                <div className={styles.vacancyContent}>
                  <h2 className={styles.vacancyTitle}>{vacancy.title}</h2>
                  <p className={styles.vacancyCredo}>
                    <BrFromater text={vacancy.credo} />
                  </p>
                  <Button
                    title="Детальніше"
                    pageID={vacancy._id}
                    vacancyButton
                  ></Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VacanciesList;
