"use client";

import React from "react";
import Image from "next/image";
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
              У Telegram-каналі ССО Рекрутинг ти знайдеш корисну інформацію про
              підготовку до служби: лайфхаки, інсайди та чесні відповіді на
              найгостріші питання. А щоб не перегоріти від серйозності, ми
              додаємо фірмовий соус з гумору та іронії.
              <br />
              <br /> Якщо хочеш бути в курсі військових трендів, розбиратися в
              спорядженні та дізнатися, як насправді виглядає служба в найкращих
              підрозділах, — тобі точно сюди. Підписуйся, буде цікаво😉
            </div>
            <a
              href="https://t.me/recruiting_sofua"
              target="_blank"
              aria-label="Посилання на телеграм"
              className={styles.button}
            >
              Переглянути
            </a>
          </div>

          <Link
            href={"https://t.me/recruiting_sofua"}
            aria-label="Посилання на телеграм"
            className={styles.imageWrapper}
          >
            {" "}
            <Image
              className={styles.image}
              src="/images/news.webp"
              fill
              sizes="100%"
              alt="Telegram"
            ></Image>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default News;
