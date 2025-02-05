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
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerWrapper}>
          <Logo width={45} height={48} fill="black" className={styles.logo} />
          <Link href="/">
            <p className={styles.hotVacancies}>🔥 Гарячі вакансії </p>
          </Link>
          <div className={styles.socialWrapper}>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <Telegram width={16} height={16} className={styles.icon} />
            </Link>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <Instagram width={16} height={16} className={styles.icon} />
            </Link>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <Facebook width={16} height={16} className={styles.icon} />
            </Link>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <Youtube width={16} height={16} className={styles.icon} />
            </Link>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <Linkedin width={16} height={16} className={styles.icon} />
            </Link>
            <Link
              href="https://www.google.com/"
              target="_blank"
              className={styles.socialIcon}
            >
              <X width={16} height={16} className={styles.icon} />
            </Link>
          </div>
        </div>
        <p className={styles.logoTitle}>
          Сили спеціальних
          <br /> операцій Збройних сил
          <br />
          України
        </p>
        <div className={styles.copyrightWrapper}>
          <p className={styles.copyright}>
            Copyright 2024 . All Rights Reserved
          </p>
          <DesignetBy />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
