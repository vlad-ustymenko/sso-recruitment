import React from "react";
import styles from "./Header.module.css";
import Container from "../Container/Container";
import Logo from "../../../src/assets/logo.svg";

const Header = () => {
  return (
    <header className={styles.container}>
      <Logo width={60} height={64} fill="white" className={styles.logo} />
      <nav className={styles.hotVacancies}>🔥 Гарячі вакансії (258)</nav>
      <div className={styles.telephoneWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <div>Заповнити анкету</div>
      </div>
    </header>
  );
};

export default Header;
