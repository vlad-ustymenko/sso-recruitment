import React from "react";
import { redirect } from "next/navigation";
import Container from "@/shared/components/Container/Container";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Menu from "@/shared/components/Menu/Menu";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import Modal from "@/shared/components/Modal/Modal";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";
import { Button } from "@/shared/components/Button/Button";
import { connectDB } from "@/lib/mongodb";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { _id } = await params;

  const db = await connectDB();

  const vacancy = await db.collection("vacancies").findOne({ slug: _id });

  if (!vacancy) {
    return {
      title: "Вакансії не знайдено",
      description: "Вакансія, яку ви шукаєте, не знайдена.",
    };
  }

  const pageTitle = vacancy.metaTitle || vacancy.title || "Вакансія";
  const pageDescription =
    vacancy.metaDescription || vacancy.description || "Опис вакансії";
  const pageImage = vacancy.bigImage || "/og-image.jpg";
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1280,
          height: 690,
          alt: pageTitle,
        },
      ],
    },
  };
}

// export async function generateStaticParams() {
//   try {
//     const db = await connectDB();
//     const vacancies = await db.collection("vacancies").find().toArray();

//     return vacancies.map((vacancy) => ({ _id: vacancy.slug }));
//   } catch (error) {
//     console.error("Помилка при отриманні вакансій:", error);
//     return [];
//   }
// }

const VacancyPage = async ({ params }) => {
  const { _id } = await params;

  const db = await connectDB();

  const vacancy = await db.collection("vacancies").findOne({ slug: _id });

  if (!vacancy) {
    notFound();
  }

  const responsibilities =
    vacancy.responsibilities?.split("*").filter((item) => item) || [];
  const guarantees =
    vacancy.guarantees?.split("*").filter((item) => item) || [];

  return (
    <main>
      <div className={styles.mainScreen}>
        <Image
          src={vacancy.bigImage}
          alt="mainScreen"
          fill
          sizes="100vw"
          priority
          className={styles.mainScreenImage}
        />
        <Button
          className={styles.backButton}
          type="button"
          title="Назад"
          backButton
        >
          Назад
        </Button>
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
              <div className={styles.guarantees}>
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
          </div>
          <ApplicationForm vacancy={vacancy.title} />
        </div>
      </Container>
      <VacanciesPrewiev title={"Інші вакансії"} />
      <Menu />
      <Modal isFormModal vacancy={vacancy.title} />
    </main>
  );
};

export default VacancyPage;
