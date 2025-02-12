import React from "react";
import styles from "./VacanciesList.module.css";

const VacanciesList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies`, {
    cache: "no-store",
  });

  const vacancies = await res.json();
  return (
    <div>
      <h2 className={styles.title}>В кому ми зацікавлені?</h2>
      <div>
        {vacancies.length === 0 ? (
          <p>Немає вакансій</p>
        ) : (
          vacancies.map((vacancy) => (
            <div key={vacancy._id} className="border p-4 my-2">
              <h2>{vacancy.title}</h2>
              <p>{vacancy.description}</p>
              <p>
                <strong>Компанія:</strong> {vacancy.company}
              </p>
              <p>
                <strong>Локація:</strong> {vacancy.location}
              </p>
              {vacancy.salary && (
                <p>
                  <strong>Зарплата:</strong> ${vacancy.salary}
                </p>
              )}
              <div
                className={styles.bigImage}
                style={{
                  backgroundImage: `url(${vacancy.bigImage})`,
                  width: "100%",
                  height: "300px",
                }}
              ></div>
              <div
                className={styles.smallImage}
                style={{
                  backgroundImage: `url(${vacancy.smallImage})`,
                  width: "100%",
                  height: "300px",
                }}
              ></div>
            </div>
          ))
        )}
      </div>
      );
    </div>
  );
};

export default VacanciesList;
