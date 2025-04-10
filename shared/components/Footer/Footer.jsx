"use client";

import React from "react";
import Instagram from "../../../src/assets/socialIcon/instagram.svg";
import Telegram from "../../../src/assets/socialIcon/telegram.svg";
import Youtube from "../../../src/assets/socialIcon/youtube.svg";
import Linkedin from "../../../src/assets/socialIcon/linkedin.svg";
import Facebook from "../../../src/assets/socialIcon/facebook.svg";
import X from "../../../src/assets/socialIcon/x.svg";
import DesignetBy from "../../../src/assets/socialIcon/designetBy.svg";
import Logo from "../../../src/assets/logo.svg";
import styles from "./Footer.module.css";
import Container from "../Container/Container";
import { useVacanciesContext } from "@/context/VacanciesContext";

import Link from "next/link";

const Footer = () => {
  const { vacancies } = useVacanciesContext();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerWrapper}>
          <div className={styles.logoWrapper}>
            <Logo width={45} height={48} fill="black" className={styles.logo} />
            <p className={styles.logoTitle}>
              Сили спеціальних
              <br /> операцій Збройних сил
              <br />
              України
            </p>
          </div>

          <Link href="/vacancies">
            <p className={styles.hotVacancies}>
              🔥 Гарячі вакансії (
              {vacancies.filter((item) => item.isActive).length})
            </p>
          </Link>
          <div className={styles.socialWrapper}>
            <Link
              href="https://t.me/recruiting_sofua"
              target="_blank"
              aria-label="Посилання на телеграм"
              className={styles.socialIcon}
            >
              <Telegram
                width={16}
                height={16}
                fill="currentColor"
                className={styles.icon}
              />
            </Link>
            <Link
              href="https://www.instagram.com/sofua.army"
              target="_blank"
              aria-label="Посилання на інстаграм"
              className={styles.socialIcon}
            >
              <Instagram
                width={16}
                height={16}
                className={styles.icon}
                fill="currentColor"
              />
            </Link>
            <Link
              href="https://www.facebook.com/sofua.army/"
              target="_blank"
              aria-label="Посилання на фейсбук"
              className={styles.socialIcon}
            >
              <Facebook
                width={16}
                height={16}
                className={styles.icon}
                fill="currentColor"
              />
            </Link>
            <Link
              href="https://youtube.com/@recsof?si=_wdXFi6m3VJNT6fG"
              target="_blank"
              aria-label="Посилання на ютуб"
              className={styles.socialIcon}
            >
              <Youtube
                width={16}
                height={16}
                className={styles.icon}
                fill="currentColor"
              />
            </Link>
            <Link
              href="http://linkedin.com/in/andrey-vasyanovych-3b14151a1"
              target="_blank"
              aria-label="Посилання на лінкедін"
              className={styles.socialIcon}
            >
              <Linkedin
                width={16}
                height={16}
                className={styles.icon}
                fill="currentColor"
              />
            </Link>
            <Link
              href="https://x.com/sof_ukr?s=21&t=6_tOu0qiRhJKNMVOo2xpew"
              target="_blank"
              aria-label="Посилання на X"
              className={styles.socialIcon}
            >
              <X
                width={16}
                height={16}
                className={styles.icon}
                fill="currentColor"
              />
            </Link>
          </div>
        </div>

        <div className={styles.copyrightWrapper}>
          <p className={styles.copyright}>
            Copyright 2024. All Rights Reserved
          </p>
          <a href="https://vintage.com.ua/" target="_blank">
            <DesignetBy />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
