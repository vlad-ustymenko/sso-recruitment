"use client";

import React from "react";
import Container from "@/shared/components/Container/Container";
import styles from "./News.module.css";
import Link from "next/link";

const News = () => {
  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.newsWrapper}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>Новини</h2>
            <div className={styles.content}>
              Військовослужбовці сухопутних військ України кожен день стоять на
              захисті рідної землі і виконують найскладніші задачі найближче до
              ворога.
              <br />
              <br /> Ви — наша опора та надія, а ваше віддане служіння
              Українському народу невпинно наближає мир і спокій в нашій з вами
              країні. Дякуємо вам за ваш величезний внесок у захист
              територіальної цілісності України!
            </div>
            <a
              href="https://t.me/recruiting_sofua"
              target="_blank"
              className={styles.button}
            >
              Переглянути
            </a>
          </div>

          <Link
            href={"https://t.me/recruiting_sofua"}
            className={styles.imageWrapper}
          ></Link>
        </div>
      </Container>
    </div>
  );
};

export default News;
