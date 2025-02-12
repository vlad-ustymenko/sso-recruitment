import Menu from "@/shared/components/Menu/Menu";
import styles from "./page.module.css";
import Image from "next/image";
import VacanciesList from "@/shared/sections/VacanciesList/VacanciesList";

export default function Vacancies() {
  return (
    <main>
      <div className={styles.mainScreen}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.titleWrapper_title}> Кого ми шукаємо?</h1>
          <p className={styles.titleWrappercontent}>
            Нам потрібні ті, хто точно знає, чому варто обрати армію. Ти не
            просто йдеш на службу ти шукаєш – виклик і розвиток у справжній
            військовій справі. Якщо ти відчуваєш, що готовий рости та ставати
            краще, ти саме той, кого ми шукєамо!
          </p>
        </div>
      </div>
      <VacanciesList />
      <Menu />
    </main>
  );
}
