import React from "react";
import styles from "./page.module.css";
import Container from "@/shared/components/Container/Container";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Menu from "@/shared/components/Menu/Menu";
import BrFromater from "@/shared/components/BrFormater/BrFromater";

const VacancyPage = async ({ params }) => {
  const { _id } = params;

  // Отримуємо всі вакансії з API
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies`, {
    cache: "no-store",
  });
  const vacancies = await res.json();

  const vacancy = vacancies.find((item) => item._id === _id);

  const responsibilities = vacancy.responsibilities
    .split("*")
    .filter((item) => item);

  const guarantees = vacancy.guarantees.split("*").filter((item) => item);

  if (!vacancy) {
    return <div>Вакансію не знайдено</div>;
  }

  // Виведення даних вакансії
  return (
    <main>
      <div
        className={styles.mainScreen}
        style={{ backgroundImage: `url(${vacancy.bigImage})` }}
      >
        <div className={styles.titleWrapper}>
          <h1 className={styles.titleWrapper_title}>{vacancy.title}</h1>
          <p className={styles.titleWrapper_description}>
            <BrFromater text={vacancy.subTitle} />
          </p>
        </div>
      </div>
      <Container>
        <div className={styles.mainContentWrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.leftContent}>
              <div className={styles.descriptionWrapper}>
                <h2 className={styles.contentTitle}>Опис вакансії</h2>
                <p className={styles.descriptionContent}>
                  <BrFromater text={vacancy.description} />
                </p>
              </div>
              <div className={styles.responsibilities}>
                <h2 className={styles.contentTitle}>Основні обов’язки</h2>
                <ul className={styles.list}>
                  {responsibilities.map((item, index) => (
                    <li key={`${item}${index}`} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.rightContent}>
              <h2 className={styles.contentTitle}>Гарантії</h2>
              <ul className={styles.list}>
                {guarantees.map((item, index) => (
                  <li key={`${item}${index}`} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ApplicationForm></ApplicationForm>
        </div>
      </Container>
      <Menu />
    </main>
  );
};

export default VacancyPage;
