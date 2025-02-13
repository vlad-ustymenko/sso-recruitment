"use client";
import React, { useEffect, useState } from "react";
import { useMenuContext } from "../../../context/MenuContext";
import { useFormModalContext } from "../../../context/FormModalContext";
import CloseMenu from "../../../src/assets/closeMenu.svg";
import Link from "next/link";
import styles from "./Menu.module.css";

const Menu = () => {
  const { activeMenu, setActiveMenu } = useMenuContext();
  const { activeFormModal, setActiveFormModal } = useFormModalContext();

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
          <div className={styles.hotVacancies}>🔥 Гарячі вакансії (258)</div>
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
