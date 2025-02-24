"use client";
import React, { useEffect } from "react";
import { useMenuContext } from "../../../context/MenuContext";
import { useModalContext } from "../../../context/ModalContext";
import CloseMenu from "../../../src/assets/closeMenu.svg";
import { useVacanciesContext } from "@/context/VacanciesContext";
import Link from "next/link";
import styles from "./Menu.module.css";

const Menu = () => {
  const { vacancies } = useVacanciesContext();

  const { activeMenu, setActiveMenu } = useMenuContext();
  const { setActiveFormModal } = useModalContext();

  useEffect(() => {
    if (activeMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [activeMenu]);

  return (
    <div className={`${styles.menu} ${activeMenu && styles.active} `}>
      <div className={styles.menuWrapper}>
        <div className={styles.title}>Menu</div>
        <CloseMenu
          width={24}
          height={24}
          onClick={() => setActiveMenu(false)}
          className={styles.closeButton}
        />
      </div>
      <div className={styles.navigation}>
        <Link href="/vacancies" onClick={() => setActiveMenu(false)}>
          <div className={styles.hotVacancies}>
            🔥 Гарячі вакансії (
            {vacancies.filter((item) => item.isActive).length})
          </div>
        </Link>
      </div>
      <div className={styles.contactWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <button
          className={styles.button}
          onClick={() => {
            setActiveFormModal(true);
            setActiveMenu(false);
          }}
        >
          Заповнити анкету
        </button>
      </div>
    </div>
  );
};

export default Menu;
