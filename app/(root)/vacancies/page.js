"use client";

import Menu from "@/shared/components/Menu/Menu";
import VacanciesList from "@/shared/sections/VacanciesList/VacanciesList";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Modal from "@/shared/components/Modal/Modal";
import { Button } from "@/shared/components/Button/Button";
import { useModalContext } from "../../../context/ModalContext";
import styles from "./page.module.css";
import Image from "next/image";

export default function Vacancies() {
  const { activeFormModal, setActiveFormModal } = useModalContext();

  return (
    <main className={styles.main}>
      <div className={styles.mainScreen}>
        <Image
          src="/images/vacanciesMainScreen.webp"
          alt="mainScreen"
          width={1280}
          height={690}
					priority
          className={styles.mainScreenImage}
        ></Image>
        <div className={styles.titleWrapper}>
          <h1 className={styles.titleWrapper_title}> Кого ми шукаємо?</h1>
          <p className={styles.titleWrapper_content}>
            <BrFromater
              text="Нам потрібні ті, хто точно знає, чому варто обрати армію. Ти не
            просто йдеш на службу, ти шукаєш виклик і розвиток у справжній
            військовій справі.& Якщо ти відчуваєш, що готовий рости та ставати
            краще, ти саме той, кого ми шукаємо!"
            ></BrFromater>
          </p>
          <Button
            style={{ width: "100%" }}
            title="Знайди свою зграю"
            logo
            className={styles.button}
            onClick={() => {
              setActiveFormModal(true);
            }}
          />
        </div>
      </div>

      <VacanciesList />

      <div className={styles.formWrapper}>
        <ApplicationForm
          title="Не знайшов, що шукав? Тоді заповни форму &і ми знайдемо застосування твоїм талантам"
          vacancy="main"
        />
      </div>

      <Menu />
      <Modal isFormModal vacancy="main" />
    </main>
  );
}
