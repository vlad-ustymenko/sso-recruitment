import React from "react";
import { redirect } from "next/navigation";
import Container from "@/shared/components/Container/Container";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Menu from "@/shared/components/Menu/Menu";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import Modal from "@/shared/components/Modal/Modal";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";
import { Button } from "@/shared/components/Button/Button";
import styles from "./page.module.css";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { _id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies/${_id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      title: "Вакансії не знайдено",
      description: "Вакансія, яку ви шукаєте, не знайдена.",
    };
  }

  const vacancy = await res.json();

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

const VacancyPage = async ({ params }) => {
  const { _id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies/${_id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    redirect("/vacancies");
  }

  const vacancy = await res.json();

  if (!vacancy) {
    return <div>Вакансію не знайдено</div>;
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
          width={1280}
          height={690}
          priority
          className={styles.mainScreenImage}
        ></Image>
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
