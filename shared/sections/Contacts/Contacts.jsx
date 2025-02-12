import React from "react";
import styles from "./Contacts.module.css";

const Contacts = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.title}>Завітай до нас в гості</div>
      <ul className={styles.adressesWrapper}>
        <li className={styles.address}>
          <div className={styles.addressTitle}>
            м. Київ,
            <br /> вул. Оболонська
            <br /> набережна, 7
          </div>
          <div className={styles.time}>з 9:00 до 18:00</div>
        </li>
        <li className={styles.address}>
          <div className={styles.addressTitle}>
            м. Дніпро,
            <br /> проспект Олександра
            <br /> Поля, 2
          </div>
          <div className={styles.time}>з 9:00 до 18:00</div>
        </li>
        <li className={styles.address}>
          <div className={styles.addressTitle}>
            м. Хмельницький,
            <br />
            вул. Соборна, 16. ЦНАП
          </div>
          <div className={styles.time}>з 9:00 до 18:00</div>
        </li>
      </ul>
      <div className={styles.title}>Телефонуй якщо є питання</div>
      <div className={styles.telephoneWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <time className={styles.time}>з 9:00 до 18:00</time>
      </div>
    </div>
  );
};

export default Contacts;
