"use client";
import React, { useEffect } from "react";
import styles from "./Menu.module.css";
import { useMenuContext } from "../../../context/MenuContext";
import Link from "next/link";
import CloseMenu from "../../../src/assets/closeMenu.svg";

const Menu = () => {
  // const [screenWidth, setScreenWidth] = useState(0);

  // useEffect(() => {
  //   setScreenWidth((prev) => (prev = window.innerWidth));
  // }, []);
  const { activeMenu, setActiveMenu } = useMenuContext();
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
          <div>🔥 Гарячі вакансії (258)</div>
        </Link>
      </div>
      <div className={styles.contactWrapper}>
        <a href="tel:0800 357 174" type="tel" className={styles.telephone}>
          0800 357 174
        </a>
        <div>Заповнити анкету</div>
      </div>
    </div>
  );
};

export default Menu;
