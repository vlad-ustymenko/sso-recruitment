import React from "react";
import styles from "./Header.module.css";
import Container from "../Container/Container";
import Icon from "../../../src/assets/logo.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <Icon fill="white" className={styles.logo} />
      <h2 className={styles.hotVacancies}>Гарячі вакансії</h2>
      <div className={styles.telephoneWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <div>Заповнити анкету</div>
      </div>
    </div>
  );
};

export default Header;
