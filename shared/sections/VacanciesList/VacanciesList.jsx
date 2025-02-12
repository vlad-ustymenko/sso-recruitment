import { Button } from "@/shared/components/Button/Button";
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
                  <p className={styles.vacancyCredo}>{vacancy.credo}</p>
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
