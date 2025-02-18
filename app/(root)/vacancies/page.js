import Menu from "@/shared/components/Menu/Menu";
import styles from "./page.module.css";
import VacanciesList from "@/shared/sections/VacanciesList/VacanciesList";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import FormModal from "@/shared/components/Modal/Modal";
import { Button } from "@/shared/components/Button/Button";

export default function Vacancies() {
  return (
    <main>
      <div className={styles.mainScreen}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.titleWrapper_title}> Кого ми шукаємо?</h1>
          <p className={styles.titleWrapper_content}>
            <BrFromater
              text="Нам потрібні ті, хто точно знає, чому варто обрати армію. Ти не
            просто йдеш на службу ти шукаєш – виклик і розвиток у справжній
            військовій справі.& Якщо ти відчуваєш, що готовий рости та ставати
            краще, ти саме той, кого ми шукєамо!"
            ></BrFromater>
          </p>
          <Button
            style={{ width: "100%" }}
            title="Знайди свою зграю"
            logo
            className={styles.button}
          />
        </div>
      </div>

      <VacanciesList />

      <div className={styles.formWrapper}>
        <ApplicationForm
          title="Не знайшов, що шукав? Тоді заповни форму &і ми знайдемо застосування твоїм талантам"
          vacancies
        />
      </div>
      <Menu />
      <FormModal isFormModal />
    </main>
  );
}
