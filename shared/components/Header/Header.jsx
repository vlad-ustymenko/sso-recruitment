"use client";

import React, { useEffect, useState } from "react";
import Logo from "../../../src/assets/logo.svg";
import MenuBurger from "../../../src/assets/menuBurger.svg";
import { useMenuContext } from "../../../context/MenuContext";
import styles from "./Header.module.css";

const Header = () => {
  const { activeMenu, setActiveMenu } = useMenuContext();
  const [scrollWidth, setScrollWidth] = useState(false);

  useEffect(() => {
    setScrollWidth((prev) => (prev = window.innerWidth));
  }, []);
  return (
    <header className={styles.container}>
      <Logo width={60} height={64} fill="white" className={styles.logo} />
      {scrollWidth >= 768 && scrollWidth < 1280 && (
        <div className={styles.menuButton}>
          <div
            className={styles.menuButtonWrapper}
            onClick={() => setActiveMenu(true)}
          >
            <MenuBurger width={16} height={16} />
            <p className={styles.menuText}>Menu</p>
          </div>
        </div>
      )}
      <nav className={styles.hotVacancies}>🔥 Гарячі вакансії (258)</nav>
      <div className={styles.contactWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <div>Заповнити анкету</div>
      </div>
      {scrollWidth < 768 && (
        <MenuBurger
          width={16}
          height={16}
          className={styles.menuBurgerMobile}
          onClick={() => setActiveMenu(true)}
        />
      )}
    </header>
  );
};

export default Header;
