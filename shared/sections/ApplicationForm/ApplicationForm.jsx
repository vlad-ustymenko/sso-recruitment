"use client";
import { useState } from "react";
import styles from "./ApplicationForm.module.css";
import Checkbox from "../../../src/assets/checkbox.svg";
import VerticalCarousel from "@/shared/components/VerticalCarousel/VerticalCarousel";

const ApplicationForm = () => {
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  return (
    <div className={styles.container}>
      <VerticalCarousel />
      <div className={styles.mainWrapper}>
        <h2 className={styles.formTitle}>
          Перший шлях в ССО,
          <br /> це заповнити заявку
        </h2>
        <form className={styles.form}>
          <input className={styles.name}></input>
          <input className={styles.name}></input>
          <input className={styles.name}></input>
        </form>
        <div className={styles.buttonWrapper}>
          <div className={styles.personalDataWrapper}>
            <div
              className={`${styles.personalDataCheckbox} ${
                activeCheckbox && styles.active
              }`}
              onClick={() => setActiveCheckbox(!activeCheckbox)}
            >
              {activeCheckbox && <Checkbox width={24} height={24} />}
            </div>
            <p className={styles.personalDataText}>
              Натискаючи кнопку відправити, ви даєте згоду{" "}
              <a href="#" className={styles.personalDataLink}>
                на обробку персональних даних.
              </a>
            </p>
          </div>
          <button type="submit" className={styles.button}>
            Знайди свою зграю
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
